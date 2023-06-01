import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({onPress, disabled , text, type = 'PRIMARY'}) => {
  const buttonStyle = [
    styles.container,
    styles[`container_${type}`],
    disabled && styles.disabledButton
  ];
  return (
    <Pressable  
    onPress={onPress}
    disabled={disabled}
    style={buttonStyle}>
    <Text style={[
      styles.text,
      styles[`text_${type}`],
      ]}>
        {text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
   
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: 'gray',
    color: 'white',
  },
  container_PRIMARY: {
    backgroundColor: '#D61355',
  },
  container_Secondary: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#D61355',
  },
  container_TERTIARY: {},
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  text_TERTIARY: {
    fontSize: 20,
    color: 'gray',
  },
  text_Secondary: {
    fontSize: 20,
    color: '#D61355',
  },
}) 
export default CustomButton