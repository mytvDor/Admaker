import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Adjust icon library and icon name as needed
import Icon2 from 'react-native-vector-icons/Ionicons';
const Service = ({route, navigation}) => {
  const {img, title, price, description, category, location, phone} =
    route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={{flex: 1, width: '100%'}}>
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
        </View>
        <Image source={{uri: img}} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.contentContainer}>
        <Row label="Service Title" value={title} iconName="title" />
        <Row label="Price" value={`$${price}`} iconName="attach-money" />
        <Row label="Description" value={description} iconName="description" />
        <Row label="Category" value={category} iconName="category" />
        <Row label="Location" value={location} iconName="location-on" />
        <Row label="Phone" value={phone} iconName="phone" />
      </View>
    </ScrollView>
  );
};

const Row = ({label, value, iconName}) => (
  <View style={styles.rowContainer}>
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={20} color="#5607f5" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
    <Text style={styles.value}>{value}</Text>
    <View style={styles.horizontalLine} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d2d4fc',
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },

  imgcont: {
    width: 400,
    height: 300,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 40,
    padding: 20,
    marginBottom: 100,
  },
  rowContainer: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    width: 500,
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    width: '25%', // Adjust the width as needed
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5607f5',
    marginRight: 10,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
    marginLeft: '5%', // Adjust to match the text container width
    marginBottom: 10,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 5,
    marginBottom: 10,
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
});

export default Service;
