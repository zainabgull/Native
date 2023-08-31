import { 
    View, 
    Text , 
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    
} from 'react-native'
import React,  { useState, useEffect } from 'react'
import Logo from '../../../assets/images/resume.png';
import CustomButton from '../../components/CustomButton';
import DocumentPicker from 'react-native-document-picker';
import { firebase } from '@react-native-firebase/auth';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import SignInScreen from '../SignInScreen';
import auth from '@react-native-firebase/auth';


const API_URL = 'http://192.168.100.118:5000/api';


const Home = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  
  // const handleLogout = async () => {
  //   try {
  //     await auth().signOut(); // Using auth() from @react-native-firebase/auth
  //     setUser(null);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleAuthStateChanged = (user) => {
  //   setUser(user);
  //   if (initializing) {
  //     setInitializing(false);
  //   }
  // };

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(handleAuthStateChanged);
  //   return () => subscriber(); // Cleanup subscription
  // }, []);

  // if (initializing) {
  //   return null; // Return a loading indicator if still initializing
  // }

  // if (!user) {
  //   return <SignInScreen />;
  // }
  const handleLogout = async () => {
    navigation.navigate("SignIn");
  }
  const [resumeData, setResumeData] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      setResumeData(result);
      setIsFileSelected(true);
      const formData = new FormData();
      result.forEach((file) => {
        formData.append('file', {
          uri: file.uri,
          type: file.type,
          name: file.name,
        });
      });

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Handle the parsed data as needed
          console.log('Parsed Resume Data:', data);
        } else {
          console.log('Error parsing resume');
        }
      } catch (error) {
        console.error('Error:', error);
      }

    } catch (err) {
      console.log('Error selecting file:', err);
    }
  };
    
  useEffect(() => {
    if (resumeData) {
      console.log('Selected Files')
      resumeData.forEach((file) => {
        console.log('File name:', file.name);
        console.log('File size:', file.size);
      });
    }
  }, [resumeData]);

  const handleCutFile = (index) => {
    const updatedResumeData = [...resumeData];
    updatedResumeData.splice(index, 1);
    setResumeData(updatedResumeData);
  
    if (updatedResumeData.length === 0) {
      setIsFileSelected(false);
    }
  };
  const parseResume = () => {
    // Code to parse the resume data
    navigation.navigate("Parsing");
  };
  return ( 
    <View style={styles.root}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      {isFileSelected ? (
        <View style={styles.cont}>
          <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.parse}>
            {resumeData.map((file, index) => (
              <View style={styles.fileRow} key={index}>
                <Icon
                  name="times-circle"
                  size={24}
                  color="black"
                  onPress={() => handleCutFile(index)}
                />
                <Text style={styles.filetext}>
                  {file.name} {file.size}
                </Text>
                {/* {name ? <Text>Candidate Name: {name}</Text> : null}*/}
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.afile} onPress={pickDocument}>
            <Text style={styles.atext}>Add Files</Text>
          </TouchableOpacity>
          <CustomButton text="Parse" onPress={parseResume} disabled={undefined} />
        </View>

      ) : (
        <View style={styles.cont}>
        <TouchableOpacity style={styles.parse} onPress={pickDocument}>
      <Text style={styles.text}>Drag and drop all résumés here</Text>
      <Text style={styles.text}>Max. 25 resumes</Text>
      <Text style={styles.text}>
          or,{' '}
          <Text style={styles.link} >
            Choose Files
          </Text>{' '}
        </Text>
    </TouchableOpacity>
    <CustomButton text="WAITING FOR FILES" onPress={pickDocument} disabled />
    <CustomButton text="Log Out" onPress={handleLogout}/>
    </View>
      )}
    </View>  
    
  )
}



const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:'#F9FBFC',
        alignItems: 'center',
        padding: 10,
    },
    cont:{
      alignItems:'center',
      width: '100%',
      paddingLeft: 20,
      paddingRight:20,
      
    },
    scrollContainer:{
      width: '100%',
    },
    parse:{
      height:300,
      paddingTop:10,
      width: '100%',
        alignItems:'center',
        paddingRight:5,
        paddingLeft:5,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "#434343",
        borderRadius: 2,
        marginBottom:10,
    },
    text:{
        fontFamily:"Poppins-SemiBold",
        color: "#434343",
        fontSize: 18,
        lineHeight:60,
    },
    filetext:{
      fontFamily:"Poppins-SemiBold",
      fontSize: 18,
      borderStyle:'solid',
      borderBottomWidth:1,
      borderRadius: 2,
      width:'100%',
      color:'black',
      paddingTop:10,
      paddingBottom:10,
      flex: 1,
    marginRight: 10,

    },
    logo: {
        width:'70%',
        maxWidth: 300,
        maxHeight: 200,
      },
    afile:{
      marginLeft:10,
      alignSelf:'flex-start',
      width:'40%',
      backgroundColor: 'white',
      borderWidth: 2,
      borderRadius: 5,
      borderColor: '#D61355',
      padding:10,
    },
    atext:{
      textAlign:'center',
      fontFamily: 'Roboto-Bold',
      fontSize: 20,
      color: '#D61355',
    },
    link: {
      color: '#D61355',
      textDecorationLine: 'underline',
    },
    fileRow:{
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
})


export default Home;