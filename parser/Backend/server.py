from flask import Flask, request, jsonify,send_file
import os
from werkzeug.utils import secure_filename
import pytesseract
from PIL import Image
import spacy
import en_core_web_sm
from spacy.matcher import Matcher
import PyPDF2
import re
from nltk.corpus import stopwords
import csv
import json
import xml.etree.ElementTree as ET
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

nlp = en_core_web_sm.load()

# initialize matcher with a vocab
matcher = Matcher(nlp.vocab)

def extract_name_from_resume(text):
    nlp_text = nlp(text)

    # First name and Last name are always Proper Nouns
    pattern = [{'POS': 'PROPN'}, {'POS': 'PROPN'}]

    matcher.add('None', [pattern])

    matches = matcher(nlp_text)

    for match_id, start, end in matches:
        span = nlp_text[start:end]
        return span.text

def extract_mobile_number(resume_text):
    mobile_number_regex = r'\b[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*\b'  # Regular expression to match phone numbers
    
    mobile_numbers = re.findall(mobile_number_regex, resume_text)
    
    if mobile_numbers:
        return mobile_numbers[0]  # Return the first mobile number found
    else:
        return None

def extract_email_addresses(string):
    r = re.compile(r'[\w\.-]+@[\w\.-]+')
    return r.findall(string)


def extract_education(text):
    education_info = []
    pattern = r"(?i)(?:Bsc|\bB\.\w+|\bM\.\w+|\bPh\.D\.\w+|\bBachelor(?:'s)?|\bMaster(?:'s)?|\bPh\.D|BS|BA)\s(?:\w+\s)*\w+"
    matches = re.finditer(pattern, text)
    for match in matches:
        education_text = match.group()
        education_info.append({"education": education_text})
            
    return education_info

import spacy
from spacy.matcher import Matcher
from nltk.stem import WordNetLemmatizer
import re



def extract_experience(resume_text):
    variations = ['experience', 'experiences', 'work experience']  # Add more variations if needed

    # Find sentences containing the variations of "experience"
    sentences = re.findall(r'[^.!?]*?(?:' + '|'.join(variations) + ')[^.!?]*[.!?]', resume_text, flags=re.IGNORECASE)

    # Extract the experience from the matched sentences
    experience_list = []
    for sentence in sentences:
        for variation in variations:
            match = re.search(r'\b' + re.escape(variation) + r'\b', sentence, flags=re.IGNORECASE)
            if match:
                experience = sentence[match.end():].strip()
                experience_list.append(experience)
                break

    return experience_list
    

def extract_addresses(text):
    nlp=spacy.load('en_core_web_sm')
    doc=nlp(text)
    for ent in doc.ents:
        if ent.label_ in [ 'LOC ', 'GPE' ]:
            return ent.text
        
import pandas as pd
import spacy
nlp = spacy.load("en_core_web_sm")  # load the English model

import pandas as pd
def extract_skills(resume_text):
    nlp_text = nlp(resume_text)

    # removing stop words and implementing word tokenization
    tokens = [token.text for token in nlp_text if not token.is_stop]
    colnames = ['skill']
    # reading the csv file
    data = pd.read_csv('G:/data/parser/skilled.csv', names=colnames) 
    
    # extract values
    skills = data.skill.tolist()
    skillset = []

    # check for one-grams (example: python)
    for token in tokens:
        if token.lower() in skills:
            skillset.append(token)
    # check for skills with spaces
    for skill in skills:
        if skill.lower() in resume_text.lower():
            skillset.append(skill)
   
    for chunk in nlp_text.noun_chunks:
        token = chunk.text.lower().strip()
        if token in skills:
            skillset.append(token)
    return [i.capitalize() for i in set([i.lower() for i in skillset])]


def extract_text_from_image(file):
    with Image.open(file) as image:
        textinput = pytesseract.image_to_string(image)
        return textinput

import spacy
from spacy.matcher import Matcher

def extract_links(text):
    # Load the spacy NLP model
    nlp = spacy.load("en_core_web_sm")

    # Define a pattern to match URLs
    url_pattern = [{"LIKE_URL": True}]

    # Initialize a Matcher with the URL pattern
    matcher = Matcher(nlp.vocab)
    matcher.add("URL_PATTERN", [url_pattern])

    # Process the text with spacy
    doc = nlp(text)

    # Find matches using the Matcher
    matches = matcher(doc)

    # Extract and return the URLs
    extracted_links = [doc[start:end].text for match_id, start, end in matches]
    return extracted_links
@app.route('/api', methods=['GET','POST'])
def parse_resume():
    if 'file' not in request.files:
        return jsonify({'error': 'No file selected!'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected!'}) 
    if file and file.filename.lower().endswith(('.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg')):
        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            os.makedirs(app.config['UPLOAD_FOLDER'])
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        if file.filename.lower().endswith(('.pdf', '.doc', '.docx')):
            # extract text from PDF or Word document
            with open(filepath, 'rb') as f:
                if file.filename.lower().endswith('.pdf'):
                    pdf_reader = PyPDF2.PdfFileReader(f)
                    textinput = ''
                    for page in range(pdf_reader.getNumPages()):
                        textinput += pdf_reader.getPage(page).extractText()
                else:
                    textinput = ''
                    for line in f:
                        textinput += line.decode('utf-8', errors='ignore')
            name = extract_name_from_resume(textinput)
            mobilenumber=extract_mobile_number(textinput)
            email=extract_email_addresses(textinput)
            education=extract_education(textinput)
            skills=extract_skills(textinput)
            experience=extract_experience(textinput)
            link=extract_links(textinput)
            return jsonify({'Name': name, 'MobileNumber':mobilenumber, 'Email':email, 'Education': education,
                            'Skills':skills, 'Experience':experience, 'Links':link})
        elif file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            textinput = extract_text_from_image(filepath)
            name = extract_name_from_resume(textinput)
            mobilenumber=extract_mobile_number(textinput)
            email=extract_email_addresses(textinput)
            return jsonify({'Name': name, 'MobileNumber':mobilenumber, 'Email':email})
    # Save data in CSV format
        csv_data = [['Name', 'MobileNumber'], [name, mobilenumber]]
        csv_filename = os.path.splitext(filename)[0] + '.csv'
        csv_filepath = os.path.join(app.config['UPLOAD_FOLDER'], csv_filename)
        with open(csv_filepath, mode='w', newline='') as csv_file:
            writer = csv.writer(csv_file)
            writer.writerows(csv_data)
    # Save data in JSON format
        json_data = {'Name': name, 'MobileNumber': mobilenumber}
        json_filename = os.path.splitext(filename)[0] + '.json'
        json_filepath = os.path.join(app.config['UPLOAD_FOLDER'], json_filename)
        with open(json_filepath, 'w') as json_file:
            json.dump(json_data, json_file)
    # Save data in XML format
        xml_root = ET.Element('ResumeData')
        ET.SubElement(xml_root, 'Name').text = name
        ET.SubElement(xml_root, 'MobileNumber').text = mobilenumber
        xml_tree = ET.ElementTree(xml_root)
        xml_filename = os.path.splitext(filename)[0] + '.xml'
        xml_filepath = os.path.join(app.config['UPLOAD_FOLDER'], xml_filename)
        xml_tree.write(xml_filepath)
    else:
        return jsonify({'error': 'Invalid file format!'})
    
@app.route('/api/download/csv', methods=['GET'])
def download_csv():
    filename = 'resume.csv'  # Replace with the actual filename
    csv_filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(csv_filepath):
        return send_file(csv_filepath, as_attachment=True)
    else:
        return jsonify({'error': 'File not found'})
    


@app.route('/api/download/json', methods=['GET'])
def download_json():
    filename = 'resume.json'
    json_filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    if os.path.exists(json_filepath):
        return send_file(json_filepath, as_attachment=True)
    else:
        return jsonify({'error': 'File not found'})

@app.route('/api/download/xml', methods=['GET'])
def download_xml():
    filename = 'resume.xml'
    xml_filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    if os.path.exists(xml_filepath):
        return send_file(xml_filepath, as_attachment=True)
    else:
        return jsonify({'error': 'File not found'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)



