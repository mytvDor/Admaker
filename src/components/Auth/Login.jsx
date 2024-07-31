import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({
  loginId,
  password,
  handleLogin,
  setLoginId,
  setPassword,
  navigation,
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin2 = async () => {
    try {
      const response = await fetch(
        'https://admakerwithoutbcrypt.onrender.com/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: loginId, password}),
        },
      );

      const data = await response.json();

      if (response.ok) {
        // Assuming the response includes a user object with user data

        console.log(data.userdata.uid);
        await AsyncStorage.setItem('user', JSON.stringify(data.email));
        await AsyncStorage.setItem(
          'email',
          JSON.stringify(data.userdata.email),
        );
        await AsyncStorage.setItem(
          'username',
          JSON.stringify(data.userdata.username),
        );
        await AsyncStorage.setItem('uid', JSON.stringify(data.userdata.uid));

        const test = await AsyncStorage.getItem('email');
        Alert.alert(' Welcome Back ..! ✅ ');
        console.log('hiiiiiiiiii', test);
        navigation.navigate('My'); // Navigate to Home screen after successful login
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
      // console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.mainbox}>
      <Text style={styles.maintxt}> Hi 👋</Text>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Login ID"
          onChangeText={text => setLoginId(text)}
          placeholderTextColor={'rgba(255, 255, 255, 0.66)'}
          value={loginId}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={'rgba(255, 255, 255, 0.66)'}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        {/* {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null} */}
        {/* <Button
          title="Login"
          onPress={async () => {
            await handleLogin2();
            handleLogin(loginId, password);
          }}
        />

        <Button
          title="Signup"
          onPress={() => {
            navigation.navigate('SignUp'); // Navigate to SignUp screen
          }}
        /> */}

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await handleLogin2();
            handleLogin(loginId, password);
          }}>
          <Icon name="sign-in" size={20} color="#5607f5" style={styles.icon} />
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('SignUp'); // Navigate to SignUp screen
          }}>
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
  maintxt: {
    marginTop: 30,

    color: '#5607f5',
    fontSize: 100,
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
    borderTopRightRadius: 0, // 5607f5 e5d9ff
  },
  mainbox: {
    height: '100%',
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

export default Login;
