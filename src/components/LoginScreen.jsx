import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  LOGIN_ID: 'LOGIN_ID',
  PASSWORD: 'PASSWORD',
};

const LoginScreen = ({setLoggedIn}) => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Simulate authentication (replace with actual logic)
    if (loginId === 'user' && password === 'password') {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.LOGIN_ID, loginId);
        await AsyncStorage.setItem(STORAGE_KEYS.PASSWORD, password);
        setLoggedIn(true); // Update parent component's state
      } catch (error) {
        console.error('Error saving credentials:', error);
      }
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logino</Text>
      <TextInput
        style={styles.input}
        placeholder="Login ID"
        onChangeText={text => setLoginId(text)}
        value={loginId}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default LoginScreen;
