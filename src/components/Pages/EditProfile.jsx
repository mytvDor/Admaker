import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('email');
        const {email, username} = JSON.parse(storedUserData);
        setEmail(email);
        setUsername(username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const updateProfile = async () => {
    try {
      const response = await fetch(
        'https://admakerwithoutbcrypt.onrender.com/updateUser',
        {
          method: 'PATCH', // Use PATCH method to update existing data
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email, // Send the email to identify the user
            username: name, // Update the username field only
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedUserData = await response.json();
      console.log('Updated user data:', updatedUserData);

      Alert.alert('Profile updated successfully');
      navigation.navigate('Profile', {updatedUser: updatedUserData});
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error updating profile:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your new name"
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput style={styles.input} value={email} editable={false} />
      <Button title="Save" onPress={updateProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default EditProfile;
