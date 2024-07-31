import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  DevSettings,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ProfilePage from './Pages/ProfilePage';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons or any other icon library you prefer
const SettingsScreen = ({handleLogout}) => {
  const [reloadKey, setReloadKey] = useState(0);

  const reloadProfilePage = () => {
    setReloadKey(prevKey => prevKey + 1);
  };
  return (
    <ScrollView>
      {/* <Text style={styles.title}>Settings</Text> */}

      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Icon
            name="log-out-outline"
            size={20}
            color="#fff"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <ProfilePage></ProfilePage>

        {/* <TouchableOpacity style={styles.button} onPress={reloadProfilePage}>
          <Icon
            name="reload-outline"
            size={20}
            color="#fff"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Reload Profile Page</Text>
        </TouchableOpacity> */}
        {/* <View style={{height: 100, width: '100%'}}></View> */}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#e5d9ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginTop: 50,
    marginBottom: 0,
    padding: 10,
    backgroundColor: '#5607f5',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%', // Adjust the width as needed
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
});

export default SettingsScreen;
