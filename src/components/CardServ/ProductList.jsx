import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Example using Ionicons
const ProductList = ({route, navigation}) => {
  const {products, category} = route.params;
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = text => {
    setSearchText(text);
    const filtered = products.filter(
      product =>
        String(product.title).toLowerCase().includes(text.toLowerCase()) ||
        String(product.price).toLowerCase().includes(text.toLowerCase()) ||
        String(product.location).toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.containeri}>
      <View
        style={{
          height: 140,
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 20,
          marginLeft: 10,
          marginRight: 10,
          marginTop: 0,
          backgroundColor: 'white',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back"
              size={20}
              color="#fff"
              style={styles.backButtonIcon}
            />
            {/* <Text style={styles.backButtonText}>Back</Text> */}
          </TouchableOpacity>
          <Text style={styles.title}>{category} Products</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by title, price, location..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <ScrollView style={styles.container}>
        {filteredProducts.map((product, index) => (
          <View
            key={product.servId}
            style={[
              styles.productCard,
              index === filteredProducts.length - 1 && styles.lastProduct,
            ]}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productDetail}>Price: {product.price}</Text>
            <Text style={styles.productDetail}>
              Location: {product.location}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('Service', {
                  img: product.img,
                  title: product.title,
                  price: product.price,
                  description: product.description,
                  category: product.category,
                  location: product.location,
                  phone: product.phone,
                })
              }>
              <Text style={styles.buttonText}>View Service</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(2, 0, 1, 0)',
    padding: 25,
  },
  containeri: {
    flex: 1,
    backgroundColor: '#d2d4fc',
    // padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    // borderRadius: 100,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingHorizontal: 8,
    marginBottom: 15,
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
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  productDetail: {
    fontSize: 16,
    marginBottom: 3,
    color: '#666666',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#5607f5',
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButtonText: {
    color: '#fff',
    flex: 1,
    fontSize: 16,
    backgroundColor: 'black',
    width: 70,
    padding: 3,
    textAlign: 'center',
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    padding: 4,
    backgroundColor: '#5607f5', // Button background color
    borderRadius: 50,
    height: 40,
    width: 40,
  },
  backButtonText: {
    color: '#fff', // Text color
    fontSize: 16,
    marginLeft: 5, // Space between icon and text
  },
  backButtonIcon: {
    marginRight: 5, // Space between icon and text
  },
  lastProduct: {
    marginBottom: 200, // Add larger marginBottom for the last product
  },
});

export default ProductList;
