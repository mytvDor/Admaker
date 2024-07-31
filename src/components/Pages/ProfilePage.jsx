// http://192.168.1.35:9000/

import React, {useEffect, useState} from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
const ProfilePage = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  products;
  const [expandedProductIds, setExpandedProductIds] = useState([]);

  const toggleExpand = productId => {
    if (expandedProductIds.includes(productId)) {
      setExpandedProductIds(expandedProductIds.filter(id => id !== productId));
    } else {
      setExpandedProductIds([...expandedProductIds, productId]);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let storedEmail = await AsyncStorage.getItem('email');
        let storedUsername = await AsyncStorage.getItem('username');

        storedEmail = storedEmail ? storedEmail.replace(/"/g, '') : null;
        storedUsername = storedUsername
          ? storedUsername.replace(/"/g, '')
          : null;

        setUsername(storedUsername);
        setEmail(storedEmail);

        if (!storedEmail) {
          throw new Error('User email not found in AsyncStorage');
        }

        const response = await fetch(
          'https://admakerwithoutbcrypt.onrender.com/getuser',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: storedEmail}),
          },
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const userData = await response.json();

        setUser(userData);

        if (userData.providedServices) {
          setServices(userData.providedServices);
        }

        const productPromises = userData.providedServices.map(service =>
          fetch(
            `https://admakerwithoutbcrypt.onrender.com/getoneprod?servId=${service}`,
          ).then(res => res.json()),
        );

        const productData = await Promise.all(productPromises);

        const filteredProducts = productData.filter(product => product);
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error fetching user data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDelete = async servId => {
    try {
      console.log('delete start');

      const response = await fetch(
        'https://admakerwithoutbcrypt.onrender.com/deleteprod',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({servId}),
        },
      );
      console.log('now', servId);
      await updateuserlist(servId);

      if (!response.ok) {
        console.log('not ok');

        throw new Error('Network response was not ok');
      }
      console.log('responce init');

      // const result = await response.json();
      // Alert.alert(result.message);
      console.log('delete init');

      setProducts(prevProducts =>
        prevProducts.filter(product => product.servId !== servId),
      );
      console.log('updated filter services db');

      setServices(prevServices =>
        prevServices.filter(service => service !== servId),
      );

      console.log('updated from services db');

      // const updatedServices = services.filter(service => service !== servId);
      // const updatedUserData = await updateUserInBackend({
      //   email,
      //   username,
      //   providedServices: updatedServices,
      // });

      // setUser(updatedUserData);

      // fetchUserData();
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Error deleting product:', error.message);
    }
  };

  const updateuserlist = async servIdle => {
    let storedEmail = await AsyncStorage.getItem('email');
    let storedUsername = await AsyncStorage.getItem('username');

    storedEmail = storedEmail ? storedEmail.replace(/"/g, '') : null;
    storedUsername = storedUsername ? storedUsername.replace(/"/g, '') : null;
    console.log('i am here 1');
    const email = await AsyncStorage.getItem('email'); // Assuming you store the user's email in AsyncStorage
    // https://admakerwithoutbcrypt.onrender.com/
    console.log(email, servIdle);
    try {
      const response = await fetch(
        'https://admakerwithoutbcrypt.onrender.com/updateUserdelete',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: storedEmail,
            servId: servIdle,
          }),
        },
      );
      console.log('i am here 2');

      if (response.ok) {
        console.log('User services updated successfully');
      } else {
        console.log('i am err 1');

        console.error('Failed to update user services');
      }
    } catch (error) {
      console.error('Error occurred while updating user services:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  async function handleLogout() {
    const hi = await AsyncStorage.getItem('email');
    console.log(hi);
    await AsyncStorage.removeItem('email');
  }

  return (
    <>
      {user ? (
        <View style={styles.container}>
          <View style={styles.topcont}>
            <Text style={styles.text}>
              <Icon name="person" style={styles.icon} /> Name: {username}
            </Text>
            <Text style={styles.text}>
              <Icon name="mail" style={styles.icon} /> Email: {email}
            </Text>
          </View>

          {products.length > 0 ? (
            <ScrollView style={styles.container}>
              {products.map((product, index) => (
                <View key={product.servId} style={[styles.productCard]}>
                  <TouchableOpacity
                    style={styles.titleRow}
                    onPress={() => toggleExpand(product.servId)}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Icon name="pricetag" size={20} color="#5607f5" />
                      <Text style={styles.productTitle}>{product.title}</Text>
                    </View>
                    <Icon
                      name={
                        expandedProductIds.includes(product.servId)
                          ? 'chevron-up'
                          : 'chevron-down'
                      }
                      size={20}
                      color="#5607f5"
                    />
                  </TouchableOpacity>
                  {expandedProductIds.includes(product.servId) && (
                    <View style={styles.space}>
                      <Text style={styles.productDetail}>
                        <Icon name="cash" style={styles.icon} /> Price:{' '}
                        {product.price}
                      </Text>
                      <Text style={styles.productDetail}>
                        <Icon name="location" style={styles.icon} /> Location:{' '}
                        {product.location}
                      </Text>
                      <Text style={styles.productDetail}>
                        <Icon name="call" style={styles.icon} /> Phone:{' '}
                        {product.phone}
                      </Text>
                      <Text style={styles.productDetail}>
                        <Icon name="list" style={styles.icon} /> Category:{' '}
                        {product.category}
                      </Text>
                      <Text style={styles.productDetail}>
                        <Icon name="document-text" style={styles.icon} />{' '}
                        Description: {product.description}
                      </Text>
                      <Image
                        source={{uri: product.img}}
                        style={styles.productImage}
                        resizeMode="contain"
                      />
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleDelete(product.servId)}>
                        <Icon
                          name="trash"
                          size={20}
                          color="#fff"
                          style={styles.iconButton}
                        />
                        <Text style={styles.buttonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.text}>No matched products found</Text>
          )}
        </View>
      ) : (
        <Text>No user data found</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e5d9ff',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productCard: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 8, // Space between icon and text
  },
  productDetail: {
    fontSize: 16,
    margin: 5,
    color: '#5607f5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 150,
    width: 90,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  lastProduct: {
    marginBottom: 200, // Add larger marginBottom for the last product
  },
  icon: {
    marginRight: 8, // Space between icon and text
    color: '#5607f5', // Icon color
    fontSize: 18, // Icon size
  },
  iconButton: {
    marginRight: 5,
  },
  space: {
    marginTop: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  topcont: {
    padding: 25,
    backgroundColor: 'white',
    width: '100%',
    top: 20,
    borderRadius: 10,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'column',
  },
});

export default ProfilePage;
