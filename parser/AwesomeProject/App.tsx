/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView ,View, Text, Image, ScrollView, TextInput, StyleSheet} from 'react-native';
import Navigation from './src/navigation';
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from './src/navigation/DrawerNavigation';


const App = () => {
  return (
    <NavigationContainer>
     
     <Navigation/>
    
    </NavigationContainer>
   
  );
};
const styles= StyleSheet.create({
  root:{
    flex: 1,
  },
})


export default App;

