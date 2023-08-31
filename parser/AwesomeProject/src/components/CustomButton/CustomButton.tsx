import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
interface CustomButtonProps {
  onPress: () => void;
  disabled?: boolean;
  text: string;
  type?: string;
}
const CustomButton: React.FC<CustomButtonProps> = ({ onPress, disabled, text, type = 'PRIMARY' }) => {
  const buttonStyle = [
    styles.container,
    styles[`container_${type}` as keyof typeof styles], // Type assertion
    disabled && styles.disabledButton,
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
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#D61355',
  },
  container_TERTIARY: {},
  text: {
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',


  },
  text_TERTIARY: {
    fontFamily:'Poppins-Medium',
    color:'black',
    fontSize:18,
    textDecorationLine:'underline',
    
  },
  text_Secondary: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: '#D61355',
  },
}) 
export default CustomButton