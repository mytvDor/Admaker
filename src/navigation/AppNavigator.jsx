import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/HomeScreen';
import SettingsScreen from '../components/SettingScreen';
import LoginScreen from '../components/LoginScreen'; // Ensure the correct path

const STORAGE_KEYS = {
  LOGIN_ID: 'LOGIN_ID',
  PASSWORD: 'PASSWORD',
};

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const storedLoginId = await AsyncStorage.getItem(STORAGE_KEYS.LOGIN_ID);
      if (storedLoginId) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.LOGIN_ID);
      await AsyncStorage.removeItem(STORAGE_KEYS.PASSWORD);
      setLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <NavigationContainer>
      {loggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Home">
            {() => <HomeScreen loginId={loginId} handleLogout={handleLogout} />}
          </Tab.Screen>
          <Tab.Screen name="Settings">
            {() => <SettingsScreen handleLogout={handleLogout} />}
          </Tab.Screen>
        </Tab.Navigator>
      ) : (
        <LoginScreen setLoggedIn={setLoggedIn} /> // Ensure setLoggedIn is passed correctly
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
