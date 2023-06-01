import { 
  View, 
  Text , 
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import Logo from '../../../assets/images/resume.png';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const Parsing = () => {
const navigation = useNavigation();
const onTry = () =>{
  navigation.navigate("Try")
}


return (
  <View style={styles.root}>
      <Image  
      source={Logo} style={styles.logo}  resizeMode="contain"
      />
      <View style={styles.parse}>
      <TouchableOpacity style={styles.result}><Text style={styles.text}>Download Excel Summary</Text></TouchableOpacity>
      <TouchableOpacity style={styles.result}><Text style={styles.text}>Download JSON File</Text></TouchableOpacity>
      <TouchableOpacity style={styles.result}><Text style={styles.text}>Download XML File</Text></TouchableOpacity>
      <Text style={styles.etext}>Enter Your email to recieve a copy of your result</Text>
      </View>
  
      <CustomButton text="Data Extraction complete!"  onPress={onTry}/>
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
    color:'black',
    marginTop:20,

  },
})
export default Parsing