import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
  } from 'react-native';
  import CustomButton from '../../components/CustomButton';
  import CustomInput from '../../components/CustomInput';
  import auth from '@react-native-firebase/auth';
  import firestore from "@react-native-firebase/firestore";
  import Logo from '../../../assets/images/resume.png';

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState('');
  const [companyname, setCompanyName] =useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
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
    }catch(error) {
      if ((error as { code: string }).code === 'auth/email-already-in-use') {
        setError('The email address is already associated with an existing account.');
      } else {
        setError((error as Error).message);
      }
    }  
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
      <View style={styles.root}>
        <Image 
         source={Logo}
         style={styles.logo}
         resizeMode="contain"
      />
        <Text style={styles.title}>Create an account</Text>
        <CustomInput
        placeholder="Username"
        value={username}
        setValue={setUsername} secureTextEntry={undefined}        />
        <CustomInput
        placeholder="Company Name"
        value={companyname}
        setValue={setCompanyName} secureTextEntry={undefined}
        />
        <CustomInput placeholder="Email" value={email} setValue={setEmail} secureTextEntry={undefined} />
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
        <CustomButton text="SignUp" onPress={onRegisterPressed} disabled={undefined} />
      </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex:1,
    backgroundColor:'#F9FBFC',
    padding: 20,
    paddingTop:60,
  },
  logo: {
    alignSelf:'center',
    width: 300,
    height: 150,
    marginBottom: 25,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    color: '#374151',
    textDecorationLine:'underline',
    
  },
  
});

export default SignUpScreen