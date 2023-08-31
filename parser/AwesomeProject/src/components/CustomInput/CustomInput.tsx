import { View, Text , TextInput , StyleSheet} from 'react-native'
import React from 'react'
interface CustomInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
}
const CustomInput: React.FC<CustomInputProps> = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
}) =>{
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        
        secureTextEntry={secureTextEntry}
      />  
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    fontFamily:'Poppins-Bold',
    backgroundColor: "white",
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input:{
    fontFamily:'Poppins-Medium',
  }
  
})

export default CustomInput