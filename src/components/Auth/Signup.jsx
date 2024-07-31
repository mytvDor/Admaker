import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignUp = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch(
        'https://admakerwithoutbcrypt.onrender.com/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username, email, password}), // Ensure body is properly stringified
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert(' Congratulations ..! 🎉 ');

        // await AsyncStorage.setItem('user', JSON.stringify(data.user));
        navigation.goBack(); // Navigate back to the previous screen after successful sign-up
      } else {
        setErrorMessage(data.message || 'Sign-up failed');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.mainbox}>
      <Text style={styles.maintxt}> Welcome 🚀</Text>

      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          value={username}
          placeholderTextColor={'rgba(255, 255, 255, 0.66)'}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          placeholderTextColor={'rgba(255, 255, 255, 0.66)'}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={'rgba(255, 255, 255, 0.66)'}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        {/* {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null} */}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Icon
            name="user-plus"
            size={20}
            color="#5607f5"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainbox: {
    height: '100%',
  },
  maintxt: {
    marginTop: 30,
    color: '#5607f5',
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'System',
    marginLeft: '5%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#5607f5',
    top: 40,
    borderWidth: 1,
    borderTopLeftRadius: 130, // Set top left border radius
    borderTopRightRadius: 0,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    width: 130,
    margin: 30,
  },
  buttonText: {
    color: '#5607f5',
    fontSize: 16,
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'rgba(255, 255, 255, 0.66)',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    color: 'white',
    placeholderTextColor: 'white',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignUp;
