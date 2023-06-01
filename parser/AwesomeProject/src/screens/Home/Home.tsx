import { 
    View, 
    Text , 
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    ScrollView,
    
} from 'react-native'
import React,  { useState, useEffect } from 'react'
import 'react-native-gesture-handler';
import Logo from '../../../assets/images/resume.png';
import CustomButton from '../../components/CustomButton';
import DocumentPicker from 'react-native-document-picker';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import SignInScreen from '../SignInScreen';


const Home = () => {
  const navigation = useNavigation();
  
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  
  
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  const [resumeData, setResumeData] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setResumeData(result);
      setIsFileSelected(true);
    } catch (err) {
      console.log('Error selecting file:', err);
    }
  };
  useEffect(() => {
    if (resumeData) {
      console.log('File name:', resumeData.name);
      console.log('File size:', resumeData.size);
    }
  }, [resumeData]);

  const parseResume = () => {
    // Code to parse the resume data
    navigation.navigate("Parsing");
  };

   
    ///const isButtonDisabled = true;
    const handleAuthStateChanged = (user) => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    };
  
    useEffect(() => {
     const subscriber = firebase.auth().onAuthStateChanged(handleAuthStateChanged);
      return subscriber;
    }, []);
    if (initializing) return null;
    if (!user) {
      return <SignInScreen />;
    }
    const handlepage = () => {
      // Code to parse the resume data
      navigation.navigate("Page");
    };

  return (
    <View style={styles.root}>
      <Image  
        source={Logo} style={styles.logo}  resizeMode="contain"
        />
      {isFileSelected ?(
        <View style={styles.cont} >
        <View style={styles.parse}>
        <Text style={styles.filetext}> {resumeData.name} {resumeData.size} </Text>
        
      </View>
      <CustomButton text="Parse"  onPress={parseResume}/>
      
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
    <CustomButton text="New page" onPress={handlepage}/>
    <CustomButton text="WAITING FOR FILES"  onPress={pickDocument} />
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
        padding: 20,
    },
    cont:{
      alignItems:'center',
      width: '100%',
      paddingLeft: 20,
      paddingRight:20,
      
    },
    parse:{
      height:300,
      paddingTop:20,
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

    },
    logo: {
        width:'70%',
        maxWidth: 300,
        maxHeight: 200,
      },
      link: {
        color: '#D61355',
        textDecorationLine: 'underline',
      },
})
export default Home