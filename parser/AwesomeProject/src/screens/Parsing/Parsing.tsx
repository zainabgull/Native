import { 
  View, 
  Text , 
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Linking, 
} from 'react-native'
import React, { useState } from 'react';
import axios from 'axios';
import Logo from '../../../assets/images/resume.png';
import CustomButton from '../../components/CustomButton';
import RNFS from 'react-native-fs';
import base64js from 'base64-js';


const Parsing = ({ navigation }: { navigation: any }) => {

  const download = async () => {
    const downloadUrl = 'http://192.168.100.118:5000/api/download/csv';
    const localFilePath = `${RNFS.DocumentDirectoryPath}/resume.csv`;
    console.log('Before Axios request');
    try {
      const response = await axios({
        url: downloadUrl,
        method: 'GET',
        responseType: 'arraybuffer', // Important: Set the response type to arraybuffer
      });
  
      // Convert array buffer to base64 using base64-js library
      const base64Data = base64js.fromByteArray(new Uint8Array(response.data));
  
      // Save the downloaded file to local storage
      await RNFS.writeFile(localFilePath, base64Data, 'base64');
      console.log('File downloaded and saved:', localFilePath);
  
      // Read the content of the downloaded file
      try {
        const content = await RNFS.readFile(localFilePath, 'utf8');
        console.log('File content:', content);
        // You can do further processing or display the content in your app
      } catch (readError) {
        console.error('Error reading file:', readError);
      }
    } catch (downloadError) {
      console.error('Error during download:', downloadError);
    }
    console.log('After Axios request');
  };
  download();
const startover= () => {
  navigation.navigate( "Home" );

}

const downloadFile = async (format: string) => {
  try {
    const baseURL = 'http://192.168.100.118:5000/api'; // Ensure that this includes the correct protocol
    const downloadURL = `${baseURL}/download/${format}`;
    const response = await fetch(downloadURL);
    if (!response.ok) {
      console.error('Download request failed with status:', response.status);
      console.error('Response data:', await response.text());
      return; // Exit the function if response status is not OK
    }
    const url = await response.text();
    const fileName = url.substring(url.lastIndexOf('/') + 1);
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    const options = {
      fromUrl: url,
      toFile: filePath,
      background: true, // Continue downloading in the background
      discretionary: true, // Allow system to prioritize this download
    };
    const downloadResult = RNFS.downloadFile(options);
    downloadResult.promise.then((result) => {
      if (result.statusCode === 200) {
        console.log('File downloaded and saved:', filePath);
        // Handle further actions like displaying a success message or using the file
      } else {
        console.log('Error downloading file');
      }
    }).catch((error) => {
      console.error('Error during download:', error);
    });
  } catch (error) {
    console.error('Error:', error);
  }
};
return (
  <View style={styles.root}>
      <Image  
      source={Logo} style={styles.logo}  resizeMode="contain"
      />
      <View style={styles.parse}>
      <Text style={styles.stext} onPress={startover}>Start Over</Text>
      <TouchableOpacity style={styles.result} onPress={() => downloadFile('csv')}>
        <Text style={styles.text}>Download Excel Summary</Text>
        </TouchableOpacity>
      <TouchableOpacity style={styles.result} onPress={() => downloadFile('json')}>
        <Text style={styles.text}>Download JSON File</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.result} onPress={() => downloadFile('xml')}>
        <Text style={styles.text}>Download XML File</Text>
        </TouchableOpacity>
        <Button title="download" onPress={download}></Button>
      {/* <Text style={styles.etext}>Enter Your email to recieve a copy of your result</Text> */}
      </View>
      <CustomButton text="Data Extraction complete!"  disabled/>
  </View>
)
}
const styles = StyleSheet.create({
  root:{
      flex:1,
      backgroundColor:'#F9FBFC',
      alignItems: 'center',
      padding:20,
  },
  parse:{
    width:"100%",
      padding:20,
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: "#434343",
      borderRadius: 2,
      marginBottom:10,
  },
  logo: {
      width:'70%',
      maxWidth: 300,
      maxHeight: 200,
    },
  result:{
      backgroundColor: '#6D28B1',
      marginTop:10,
      color: 'white',
      alignContent:'center',
  },
  text:{
    fontFamily:"Poppins-SemiBold",
    color: 'white',
    fontSize: 20,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    
  },
  etext:{
    fontFamily:"Poppins-SemiBold",
    marginTop:20,
  },
  stext:{
      fontFamily:"Poppins-SemiBold",
    
      
      
  },
})
export default Parsing