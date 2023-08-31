import { 
  Image,
  View, 
  Text, 
  StyleSheet ,
  ScrollView,


} from 'react-native';
import React, {useState} from 'react';
import Logo from '../../../assets/images/resume.png';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';



const StartScreen = () => {
  const navigation = useNavigation();
  const onLogin = () =>{
    navigation.navigate("SignIn");
  }
  const onSignup= () =>{
    navigation.navigate("SignUp");
  }
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
      <Text style={styles.text}>
      Find your next star performer with a click
      </Text>
      <CustomButton text="LOGIN" onPress={onLogin} />
       
        <CustomButton text="Sign Up" onPress={onSignup} type="Secondary" />
      
    </View> 
  )
}

const styles= StyleSheet.create({
  root: {
    backgroundColor: '#F9FBFC',
    flex:1,
    alignItems: 'center' ,
    paddingTop: 110,
    padding:20,
    
  },
  logo: {
    width: 300,
    height: 150,
    marginBottom: 25,
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    textAlign: 'center',
    color: '#374151',
    paddingTop: 20,
    paddingBottom: 30,
  },
 
})


export default StartScreen