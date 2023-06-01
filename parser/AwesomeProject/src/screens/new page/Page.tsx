import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const Page = () => {
  const [name, setName] = useState('');

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.images,
        ],
      });

      const formData = new FormData();
      formData.append('file', {
        uri: result.uri,
        type: result.type,
        name: result.name,
      });

      const response = await fetch('http://127.0.0.1:5000/api/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();

      setName(data.name);
    } catch (err) {
      console.log('Error picking file: ', err);
    }
  };

  return (
    <View>
      <Button title="Select Resume" onPress={handleFilePicker} />
      {name && <Text>Name: {name}</Text>}
    </View>
  );
};

export default Page;
