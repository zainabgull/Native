import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
    ScrollView,
  } from 'react-native';
  import CustomButton from '../../components/CustomButton';
  import CustomInput from '../../components/CustomInput';
  import {useNavigation} from '@react-navigation/core';
  import auth from '@react-native-firebase/auth';
  import firestore from "@react-native-firebase/firestore";
  import { NavigationContainer } from '@react-navigation/native';
  

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [companyname, setCompanyName] =useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  

  const navigation = useNavigation();
  const [error, setError] = useState('');

  
  const onRegisterPressed = async() => {
    if (!username || !companyname || !email || !password || !passwordRepeat) {
      setError('Please fill in both email and password fields.');
      return;
    }
    if (password !== passwordRepeat) {
      setError('Please enter match Password');
      return;
    } 
    if (!email.endsWith("@gmail.com")) {
      setError('Please enter a valid email address.');
      return;
    }
    try{
    const result= await auth().createUserWithEmailAndPassword(email,password)
        firestore().collection('users').doc(result.user.uid).set({
          name:username,
          CompanyName:companyname,
          email:result.user.email,
          uid:result.user.uid,
          
        })
        .then(() => {
          navigation.navigate("Home");
        })
        
    }catch(error){
      if (error.code === 'auth/email-already-in-use') {
          setError('The email address is already associated with an existing account.');
        }else {
          setError(error.message);
          
        }
      }
    
  };
                
           
     
  

  const onSignInPress = () => {
    console.warn("OnSignIn")

  };

  
  

  return (
    
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />
        <CustomInput
           placeholder="Company Name"
           value={companyname}
           setValue={setCompanyName}   

        />
        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        <CustomInput
          placeholder="Repeat Password"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry
        />
        {error && <Text>{error}</Text>}
        <CustomButton text="Register"  onPress={onRegisterPressed} />

        


        
      </View>
    
  );
};

const styles = StyleSheet.create({
  root: {
    flex:1,
    backgroundColor:'#F9FBFC',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
    
  },
  
  
});

export default SignUpScreen