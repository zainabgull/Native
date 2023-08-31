import React, { useState } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';


const API_URL = 'http://192.168.100.118:5000/api/test';

const App = () => {
  const [name, setName] = useState('');
  const [mobilenumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const selectResume = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const data = new FormData();
      data.append('file', {
        uri: res[0].uri,
        name: res[0].name,
        type: res[0].type,
      });

      const response = await fetch(API_URL, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const jsonData = await response.json();

      if (jsonData.name) {
        setName(jsonData.name);
       
      } else {
        setName('Name not found');
      }
      if(jsonData.mobilenumber){
        setPhoneNumber(jsonData.mobilenumber)
      }else{
        setPhoneNumber("phone number not found")
      }
      if(jsonData.email){
        setEmail(jsonData.email)
      }else{
        setEmail("Email not found")
      }
     
    } catch (error) {
      console.log(error);
    }
  };

  const saveFiles = async (format) => {
    try {
      const data = {
        name,
        mobilenumber,
        email,
      };

      let fileContent;

      if (format === 'csv') {
        const fields = Object.keys(data);
        const json2csvParser = new Parser({ fields });
        fileContent = json2csvParser.parse(data);
      } else if (format === 'json') {
        fileContent = JSON.stringify(data, null, 2);
      } else if (format === 'xml') {
        fileContent = convertToXML({ data });
      }

      const filePath = `${RNFS.DocumentDirectoryPath}/resume.${format}`;
      await RNFS.writeFile(filePath, fileContent, 'utf8');

      Alert.alert('Success', `Resume saved as ${format.toUpperCase()}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Select Resume" onPress={selectResume} />
      {name ? <Text>Candidate Name: {name}</Text> : null}
      {mobilenumber ? <Text>Mobile Number: {mobilenumber}</Text> : null}
      {email ? <Text>Email Address: {email}</Text> : null}

      <Button title="Save as CSV" onPress={() => saveFiles('csv')} />
      <Button title="Save as JSON" onPress={() => saveFiles('json')} />
      <Button title="Save as XML" onPress={() => saveFiles('xml')} />
    </View>
  );
};

export default App;
