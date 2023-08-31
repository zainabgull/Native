import React, {useState ,useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Logo from '../../../assets/images/resume.png';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import auth from "@react-native-firebase/auth";
import { firebase } from '@react-native-firebase/auth';
const SignInScreen = ({ navigation }: { navigation: any  }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {height} = useWindowDimensions();
  const handleLogin = async() => {
    if (!email || !password) {
      console.warn('Please fill in all fields');
    } 
    try{
      const result=await auth().signInWithEmailAndPassword(email,password)
      .then(() => {
        navigation.navigate("Home");
      })
    }catch(error){
      setError((error as Error).message);
    }
    }
  const onForgotPasswordPressed = () =>{
    navigation.navigate("ForgotPassword")
  }
  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Navigate to the home screen
        navigation.navigate("DrawerNavigation");
      }
    });
    // Clean up the listener on unmount
    return unsubscribe;
  }, []);
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSignup=()=>{
    navigation.navigate("SignIn")
  }
  return (
      <View style={styles.root}>
        <Image 
         source={Logo}
         style={[styles.logo, {height: height * 0.3}]} 
         resizeMode="contain" 
         /> 
         <CustomInput 
        placeholder="EmailAddress"
        value={email}
        setValue={setEmail} secureTextEntry={undefined}/>
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        <CustomButton text="LOGIN" onPress={handleLogin} disabled={undefined} />
        <CustomButton text="SIGN UP" onPress={handleSignup} disabled={undefined} />
        {error && <Text>{error}</Text>}
        <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} 
        type="TERTIARY" disabled={undefined}/>       
      </View>  
  );
};
const styles = StyleSheet.create({
  root: {
    backgroundColor: '#F9FBFC',
    flex:1,
    alignItems: 'center',
    padding:20,
    paddingTop:120,
    
  },
  logo: {
    width:'70%',
    maxWidth: 300,
    maxHeight: 200,
  }, 
});

export default SignInScreen;