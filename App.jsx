import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductUploadScreen from './firebase/ProductUploadScreen';
import HomeScreen from './src/components/HomeScreen';
import Login from './src/components/Auth/Login';
import Signup from './src/components/Auth/Signup';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfilePage from './src/components/Pages/ProfilePage';
import EditProfile from './src/components/Pages/EditProfile';
import SettingsScreen from './src/components/SettingScreen';
import Temp from './src/components/Temp';
const Stack = createNativeStackNavigator();

const STORAGE_KEYS = {
  LOGIN_ID: 'LOGIN_ID',
  PASSWORD: 'PASSWORD',
};

// const HomeScreen = ({loginId, handleLogout}) => (
//   <View style={styles.container}>
//     <Text style={styles.title}>Welcome</Text>
//     <Text>You are logged in as: {loginId}</Text>
//     <Button title="Logout" onPress={handleLogout} />
//   </View>
// );

// const SettingsScreen = ({handleLogout}) => (
//   <View style={styles.container}>
//     <Text style={styles.title}>Settings</Text>
//     <Button title="Logout" onPress={handleLogout} />
//   </View>
// );

const Tab = createBottomTabNavigator();

const App = ({navigation}) => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const storedLoginId = await AsyncStorage.getItem(STORAGE_KEYS.LOGIN_ID);
      const hi = await AsyncStorage.getItem('email');
      console.log(hi);
      if (storedLoginId && hi) {
        setLoginId(storedLoginId);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const handleLogin = async (loginId, password) => {
    // Simulate authentication (replace with actual logic)
    if (true) {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.LOGIN_ID, loginId);
        await AsyncStorage.setItem(STORAGE_KEYS.PASSWORD, password);
        setLoginId(loginId);
        setLoggedIn(true);
      } catch (error) {
        console.error('Error saving credentials:', error);
      }
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.LOGIN_ID);
      await AsyncStorage.removeItem(STORAGE_KEYS.PASSWORD);
      await AsyncStorage.removeItem('email');

      setLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    // <NavigationContainer screenOptions={{}}>
    //   {loggedIn ? (
    //     <Tab.Navigator>
    //       <Tab.Screen name="Home">
    //         {() => <HomeScreen loginId={loginId} handleLogout={handleLogout} />}
    //       </Tab.Screen>
    //       <Tab.Screen name="Upload">{() => <ProductUploadScreen />}</Tab.Screen>
    //       <Tab.Screen name="Profile">
    //         {() => <SettingsScreen handleLogout={handleLogout} />}
    //       </Tab.Screen>
    //       {/* <Tab.Screen name="Temp">{() => <Temp />}</Tab.Screen> */}

    //       {/* <Tab.Screen name="Profile" component={ProfileStack} /> */}
    //       {/* <Tab.Screen name="Profile">
    //         {() => <ProfileStack handleLogout={handleLogout} />}
    //       </Tab.Screen> */}
    //     </Tab.Navigator>
    //   ) : (
    //     <Stack.Navigator
    //       initialRouteName="Login"
    //       screenOptions={{headerShown: false}}>
    //       <Stack.Screen
    //         name="Login"
    //         options={{title: 'Login', headerShown: false}}
    //         initialParams={{
    //           loginId,
    //           password,
    //           handleLogin,
    //           setLoginId,
    //           setPassword,
    //         }}>
    //         {props => (
    //           <Login
    //             {...props}
    //             loginId={loginId}
    //             password={password}
    //             handleLogin={handleLogin}
    //             setLoginId={setLoginId}
    //             setPassword={setPassword}
    //           />
    //         )}
    //       </Stack.Screen>
    //       <Stack.Screen name="SignUp" component={Signup} />
    //       <Stack.Screen
    //         name="My"
    //         options={{headerShown: false}}
    //         component={HomeScreen}
    //       />
    //       {/* <Stack.Screen name="ProfilePage">
    //         {() => <ProfilePage navigation={navigation} />}
    //       </Stack.Screen>
    //       <Stack.Screen name="Edit">
    //         {() => <EditProfile navigation={navigation} />}
    //       </Stack.Screen> */}
    //       {/* <Stack.Screen name="Profile" component={ProfilePage} />
    //         <Stack.Screen name="EditProfile" component={EditProfilePage} /> */}
    //     </Stack.Navigator>
    //   )}
    // </NavigationContainer>);

    <NavigationContainer>
      {loggedIn ? (
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Upload') {
                iconName = focused ? 'cloud-upload' : 'cloud-upload-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },

            tabBarActiveTintColor: '#5607f5',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              borderRadius: 20,
              position: 'absolute',
              bottom: 20,
              left: 10,
              right: 10,
              height: 60,
            },
            headerStyle: {
              backgroundColor: '#5607f5',
              // width: '100%',
              borderBottomLeftRadius: 1, // Same as headerContainer
              borderBottomRightRadius: 2, // Same as headerContainer
              // transform: [{scaleX: 1.5}],
            },
            headerTintColor: '#fff',
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            // },
            // headerRight: () => (
            //   <Icon.Button
            //     name="ios-log-out"
            //     size={25}
            //     backgroundColor="#f4511e"
            //     onPress={handleLogout}
            //   />
            // ),
          })}>
          <Tab.Screen name="Home">
            {() => <HomeScreen loginId={loginId} handleLogout={handleLogout} />}
          </Tab.Screen>
          <Tab.Screen name="Upload">{() => <ProductUploadScreen />}</Tab.Screen>
          <Tab.Screen name="Profile">
            {() => <SettingsScreen handleLogout={handleLogout} />}
          </Tab.Screen>
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Login"
            options={{title: 'Login', headerShown: false}}
            initialParams={{
              loginId,
              password,
              handleLogin,
              setLoginId,
              setPassword,
            }}>
            {props => (
              <Login
                {...props}
                loginId={loginId}
                password={password}
                handleLogin={handleLogin}
                setLoginId={setLoginId}
                setPassword={setPassword}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="SignUp" component={Signup} />
          <Stack.Screen
            name="My"
            options={{headerShown: false}}
            component={HomeScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const ProfileStack = ({handleLogout}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ProfilePage"
        handleLogout={handleLogout}
        component={ProfilePage}
      />
      {/* <Stack.Screen name="EditProfile" component={EditProfile} /> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  containeri: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  transparentBackground: {
    flex: 1,
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default App;
// import React from 'react';
// import AppNavigator from './src/navigation/AppNavigator';

// const App = () => {
//   return <AppNavigator />;
// };

// export default App;
