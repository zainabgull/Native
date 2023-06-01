/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView ,View, Text, Image, ScrollView, TextInput, StyleSheet} from 'react-native';
import Navigation from './src/navigation';
import auth from "@react-native-firebase/auth";
import { firebase } from '@react-native-firebase/auth';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
     <Navigation />
    </SafeAreaView>
   
  );
};
const styles= StyleSheet.create({
  root:{
    flex: 1,
  },
})

export default App;