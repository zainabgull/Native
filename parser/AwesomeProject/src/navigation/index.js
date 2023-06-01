import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import SignInScreen from '../screens/SignInScreen';
import StartScreen from '../screens/StartScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPassword from '../screens/ForgotPassword';
import NewPassword from '../screens/NewPassword/NewPassword';
import Home from '../screens/Home';
import Parsing from '../screens/Parsing';

import Page from '../screens/new page/Page';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator >
    <Stack.Screen name="StartScreen" component={StartScreen}/>
    <Stack.Screen name="SignIn"  component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="NewPassword" component={NewPassword}/>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Parsing" component={Parsing}/>
    <Stack.Screen name='Page' component={Page}/>

    
    

    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Navigation;