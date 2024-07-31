// import React, {useState} from 'react';
// import {View, Text, TextInput, Button, Alert} from 'react-native';
// import {initializeApp} from 'firebase/app';
// import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
// import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';

// const firebaseConfig = {
//   // Your Firebase config here

//   // Replace with your Firebase config object
//   apiKey: 'AIzaSyCN53do3R4DcXWgWKwPy62GI6t7qQY1tC8',
//   authDomain: 'admaker-b68bc.firebaseapp.com',
//   projectId: 'admaker-b68bc',
//   storageBucket: 'admaker-b68bc.appspot.com',
//   messagingSenderId: '102191895296',
//   appId: '1:102191895296:web:7bdc29b4f6474a618bd9e5',
//   measurementId: 'G-MHEZWNV6BG',
// };

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

// const ProductUploadScreen = () => {
//   const [entry, setEntry] = useState({
//     title: '',
//     img: null,
//     price: '',
//     description: '',
//     category: '',
//   });

//   const [imgUrl, setImgUrl] = useState('');

//   //   const handleImgPicker = async () => {
//   //     const options = {
//   //       mediaType: 'photo',
//   //       maxWidth: 300,
//   //       maxHeight: 300,
//   //       quality: 1,
//   //       includeBase64: false,
//   //       storageOptions: {
//   //         skipBackup: true,
//   //         path: 'images',
//   //       },
//   //     };

//   //     launchImageLibrary(options, response => {
//   //       if (response.didCancel) {
//   //         console.log('User cancelled image picker');
//   //       } else if (response.error) {
//   //         console.log('ImagePicker Error: ', response.error);
//   //       } else {
//   //         setEntry(prevState => ({
//   //           ...prevState,
//   //           img: response.assets[0].uri,
//   //         }));
//   //       }
//   //     });
//   //   };

//   //   const handleImgUpload = async () => {
//   //     if (!entry.img) {
//   //       Alert.alert('Please select an image');
//   //       return false;
//   //     }

//   //     const {uri, name} = entry.img;
//   //     const StorageRef = ref(storage, `ages/${name}`);

//   //     try {
//   //       await uploadBytes(StorageRef, uri);
//   //       const url = await getDownloadURL(StorageRef);
//   //       setImgUrl(url);

//   //       setEntry(prevState => ({
//   //         ...prevState,
//   //         img: url,
//   //       }));
//   //       Alert.alert('Image uploaded successfully');
//   //       return true;
//   //     } catch (error) {
//   //       console.log('Error uploading image:', error);
//   //       Alert.alert('Error uploading image');
//   //       return false;
//   //     }
//   //   };
//   const handleImgPicker = async () => {
//     const options = {
//       mediaType: 'photo',
//       // maxWidth: 300,
//       // maxHeight: 300,
//       quality: 1,
//       includeBase64: false,
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         // Assuming response.assets is an array, handle the first asset
//         const selectedImage = response.assets[0];
//         console.log(selectedImage);
//         setEntry(prevState => ({
//           ...prevState,
//           img: selectedImage,
//         }));
//       }
//     });
//   };

//   const handleImgUpload = async () => {
//     if (!entry.img) {
//       Alert.alert('Please select an image');
//       return false;
//     }

//     const {uri, fileName} = entry.img; // Assuming fileName is provided by react-native-image-picker
//     const response = await fetch(uri);
//     const blob = await response.blob(); // Convert image URI to Blob

//     const storageRef = ref(storage, `images/${fileName}`);

//     try {
//       const snapshot = await uploadBytes(storageRef, blob);
//       const downloadURL = await getDownloadURL(snapshot.ref);
//       setImgUrl(downloadURL);

//       setEntry(prevState => ({
//         ...prevState,
//         img: downloadURL, // Update img state with downloadURL
//       }));
//       Alert.alert('Image uploaded successfully');
//       return true;
//     } catch (error) {
//       console.log('Error uploading image:', error);
//       Alert.alert('Error uploading image');
//       return false;
//     }
//   };

//   const handleChange = (name, value) => {
//     setEntry(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     // Perform validation or other checks here before submitting
//     const imgUploadSuccess = await handleImgUpload();

//     if (!imgUploadSuccess) {
//       console('hit parent thik aahe');
//       return;
//     }

//     // try {
//     //   const response = await fetch(
//     //     'http://localhost: 192.168.1.35/uploadProduct',
//     //     {
//     //       method: 'POST',
//     //       headers: {
//     //         'Content-Type': 'application/json',
//     //       },
//     //       body: JSON.stringify(entry),
//     //     },
//     //   );
//     //   if (response.ok) {
//     //     Alert.alert('Product added successfully');
//     //     // Reset form if needed
//     //     setEntry({
//     //       title: '',
//     //       img: '',
//     //       price: '',
//     //       description: '',
//     //       category: '',
//     //     });
//     //   } else {
//     //     console.error('Failed to add product');
//     //     Alert.alert('Failed to add product');
//     //   }
//     // } catch (error) {
//     //   console.error('Error occurred:', error);
//     //   Alert.alert('Error occurred while adding product');
//     // }
//   };

//   return (
//     <View style={{margin: 20}}>
//       <Text>Title:</Text>
//       <TextInput
//         style={{
//           height: 40,
//           borderColor: 'gray',
//           borderWidth: 1,
//           marginBottom: 10,
//         }}
//         onChangeText={text => handleChange('title', text)}
//         value={entry.title}
//       />

//       {/* Handle image selection */}
//       <Button title="Select Image" onPress={handleImgPicker} />

//       <Text>Price:</Text>
//       <TextInput
//         style={{
//           height: 40,
//           borderColor: 'gray',
//           borderWidth: 1,
//           marginBottom: 10,
//         }}
//         onChangeText={text => handleChange('price', text)}
//         value={entry.price}
//       />

//       <Text>Description:</Text>
//       <TextInput
//         style={{
//           height: 40,
//           borderColor: 'gray',
//           borderWidth: 1,
//           marginBottom: 10,
//         }}
//         onChangeText={text => handleChange('description', text)}
//         value={entry.description}
//       />

//       <Text>Category:</Text>
//       <TextInput
//         style={{
//           height: 40,
//           borderColor: 'gray',
//           borderWidth: 1,
//           marginBottom: 10,
//         }}
//         onChangeText={text => handleChange('category', text)}
//         value={entry.category}
//       />

//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// export default ProductUploadScreen;
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {initializeApp} from 'firebase/app';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Adjust icon library and icon name as needed
import AsyncStorage from '@react-native-async-storage/async-storage';
const categories = [
  {title: 'Rental'},
  {title: 'Babysitter'},
  {title: 'Car'},
  {title: 'Other Services'},
  {title: 'Job'},
  {title: 'Hair Stylist'},
  {title: 'Buy & Sell'},
  {title: 'Real Estate Agent'},
  {title: 'Tutor'},
  {title: 'Market'},
  {title: 'Cafe'},
  {title: 'Cook'},
  {title: 'Lawyer'},
  {title: 'Tax Services'},
  {title: 'Dating & Marriage'},
  {title: 'Driving School'},
  {title: 'Cell Phone Man'},
  {title: 'Restaurant'},
  {title: 'Remodeling'},
  {title: 'Event'},
  {title: 'Preschool & Daycare'},
  {title: 'Electrician'},
  {title: 'Plumber'},
];

const firebaseConfig = {
  // Your Firebase config here

  // Replace with your Firebase config object
  apiKey: 'AIzaSyCN53do3R4DcXWgWKwPy62GI6t7qQY1tC8',
  authDomain: 'admaker-b68bc.firebaseapp.com',
  projectId: 'admaker-b68bc',
  storageBucket: 'admaker-b68bc.appspot.com',
  messagingSenderId: '102191895296',
  appId: '1:102191895296:web:7bdc29b4f6474a618bd9e5',
  measurementId: 'G-MHEZWNV6BG',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
var downloadURL = '';
const ProductUploadScreen = () => {
  const [entry, setEntry] = useState({
    title: '',
    img: '',
    price: '',
    description: '',
    category: '',
    phone: '',
    uid: '',
    location: '',
  });

  const [imgUrl, setImgUrl] = useState('');
  const [temp, settemp] = useState();
  const [final, setfinal] = useState();
  // const [final, setfinal] = useState();

  const handleImgPicker = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const selectedImage = response.assets[0];
        console.log(selectedImage);
        settemp(prevState => ({
          ...prevState,
          img: selectedImage,
        }));
        setImgUrl(selectedImage.uri);
      }
    });
  };

  const handleImgUpload = async () => {
    if (!temp.img) {
      Alert.alert('Please select an image');
      return false;
    }

    const {uri, fileName} = temp.img;
    const response = await fetch(uri);
    const blob = await response.blob();
    let storedEmail = await AsyncStorage.getItem('email');

    storedEmail = storedEmail ? storedEmail.replace(/"/g, '') : null;

    console.log('here is email', storedEmail);
    const timestamp = Date.now();
    const fid = `${storedEmail}-${timestamp}`;

    console.log(fid);

    const storageRef = ref(storage, `images/${fid}`);

    try {
      const snapshot = await uploadBytes(storageRef, blob);
      downloadURL = await getDownloadURL(snapshot.ref);
      console.log(downloadURL);

      setfinal(downloadURL);

      console.log('hiiiiiiiiiiiiiiiiiiiiiiiiieeieieiieieieie', downloadURL);
      // const hi = await handleChange(img , final)
      // setEntry(prevState => {
      //   const updatedEntry = {
      //     ...prevState,
      //     img: downloadURL,
      //   };
      //   console.log('after upload', updatedEntry);
      //   return updatedEntry;
      // });

      Alert.alert('Image uploaded successfully');
      return true;
    } catch (error) {
      console.log('Error uploading image:', error);
      Alert.alert('Error uploading image');
      return false;
    }
  };

  const handleChange = (name, value) => {
    setEntry(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const generateServId = async () => {
    try {
      // const emailer = await AsyncStorage.getItem('email');
      let storedEmaile = await AsyncStorage.getItem('email');

      storedEmaile = storedEmaile ? storedEmaile.replace(/"/g, '') : null;

      if (storedEmaile) {
        console.log('here is email', storedEmaile);
        const timestampe = Date.now();
        const dos = `${storedEmaile}-${timestampe}`;
        console.log(dos);
        return dos;
      } else {
        console.warn(
          'Email not found in AsyncStorage. Service ID generation failed.',
        );

        return null;
      }
    } catch (error) {
      console.error('Error retrieving email from AsyncStorage:', error);
      return null;
    }
  };

  // const handleSubmit = async () => {
  //   if (
  //     !entry.title ||
  //     !entry.price ||
  //     !entry.description ||
  //     !entry.category ||
  //     !entry.phone ||
  //     !entry.location
  //   ) {
  //     Alert.alert('Validation error', 'Please fill all the fields.');
  //     return;
  //   }
  //   const imgUploadSuccess = await handleImgUpload();
  //   console.log(imgUploadSuccess);

  //   if (!imgUploadSuccess) {
  //     return;
  //   }

  //   const servIdle = await generateServId();
  //   console.log(servIdle);

  //   const uid = await AsyncStorage.getItem('uid');
  //   console.log(uid);
  //   try {
  //     const response = await fetch(
  //       'https://admakerwithoutbcrypt.onrender.com/uploadProduct',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           ...entry,
  //           servId: servIdle,
  //           img: final,
  //           uid: uid,
  //         }),
  //       },
  //     );

  //     if (response.ok) {
  //       console.log(final);

  //      await updateuserlist(servIdle);

  //       Alert.alert('Product added successfully');
  //       setEntry({
  //         title: '',
  //         img: null,
  //         price: '',
  //         description: '',
  //         category: '',
  //         phone: '',
  //         uid: '',
  //       });
  //       setImgUrl('');
  //     } else {
  //       console.error('Failed to add product');
  //       Alert.alert('Failed to add product');
  //     }
  //   } catch (error) {
  //     console.error('Error occurred:', error);
  //     Alert.alert('Error occurred while adding product');
  //   }
  // };

  // const updateuserlist = async (servIdle) => {

  // };
  const handleSubmit = async () => {
    if (!entry.title) {
      Alert.alert('Validation error', 'Please fill all the fields.');
      return;
    }
    const imgUploadSuccess = await handleImgUpload();
    // console.log(imgUploadSuccess);

    if (!imgUploadSuccess) {
      return;
    }

    const servIdle = await generateServId();
    // console.log(servIdle);

    const uid = await AsyncStorage.getItem('uid');
    // console.log(uid);
    // console.log('why bro   ', final);

    try {
      console.log('HERE    CAN     PATCH', downloadURL);
      const response = await fetch(
        'https://admakerwithoutbcrypt.onrender.com/uploadProduct',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...entry,
            servId: servIdle,
            uid: uid,
            img: downloadURL,
          }),
        },
      );
      console.log(entry);
      if (response.ok) {
        console.log(final);

        await updateuserlist(servIdle);

        // await updateuserlist(servIdle);

        Alert.alert('Product added successfully');
        // setEntry({
        //   title: '',
        //   img: null,
        //   price: '',
        //   description: '',
        //   category: '',
        //   phone: '',
        //   uid: '',
        // });
        // setImgUrl('');
      } else {
        console.error('Failed to add product');
        Alert.alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      Alert.alert('Error occurred while adding product');
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
        'https://admakerwithoutbcrypt.onrender.com/updateuser',
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          <Icon name="title" size={20} color="#5607f5" /> Title:
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => handleChange('title', text)}
          value={entry.title}
          placeholder="Enter title"
        />
      </View>

      <View style={styles.inputContainer}>
        {imgUrl && (
          <View style={styles.imagePreviewContainer}>
            <View style={styles.dottedBox}>
              <Image source={{uri: imgUrl}} style={styles.image} />
            </View>
          </View>
        )}
        <TouchableOpacity
          style={styles.selectImageButton}
          onPress={handleImgPicker}>
          <Text style={styles.selectImageButtonText}>Select Image</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          <Icon name="attach-money" size={20} color="#5607f5" /> Price (in $):
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={text => handleChange('price', text)}
          value={entry.price}
          placeholder="Enter price"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          <Icon name="description" size={20} color="#5607f5" /> Description:
        </Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          onChangeText={text => handleChange('description', text)}
          value={entry.description}
          placeholder="Enter description"
          multiline
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          <Icon name="category" size={20} color="#5607f5" /> Category:
        </Text>
        <SelectDropdown
          data={categories}
          onSelect={(selectedItem, index) =>
            handleChange('category', selectedItem.title)
          }
          renderButton={(selectedItem, isOpened) => (
            <View
              style={[
                styles.dropdownButtonStyle,
                isOpened && styles.openedDropdown,
              ]}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(entry.category && entry.category) || 'Select category'}
              </Text>
              <Text style={styles.dropdownButtonArrowStyle}>
                {isOpened ? '▲' : '▼'}
              </Text>
            </View>
          )}
          renderItem={(item, index, isSelected) => (
            <View
              style={[
                styles.dropdownItemStyle,
                isSelected && styles.selectedDropdownItem,
              ]}>
              <Text
                style={[
                  styles.dropdownItemTxtStyle,
                  isSelected && styles.selectedDropdownItemtext,
                ]}>
                {item.title}
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          <Icon name="phone" size={20} color="#5607f5" /> Phone:
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={text => handleChange('phone', text)}
          value={entry.phone}
          placeholder="Enter phone"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          <Icon name="location-on" size={20} color="#5607f5" /> Location:
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => handleChange('location', text)}
          value={entry.location}
          placeholder="Country, State, District"
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Icon
          name="send"
          size={20}
          color="#fff"
          style={styles.submitButtonIcon}
        />
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <View style={{height: 200, width: '100%'}}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5d9ff',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#5607f5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  selectImageButton: {
    backgroundColor: '#5607f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectImageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownButtonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 8,
  },
  dropdownButtonTxtStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#5607f5',
  },
  dropdownButtonArrowStyle: {
    fontSize: 18,
    color: '#5607f5',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#5607f5',
  },
  openedDropdown: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  selectedDropdownItem: {
    backgroundColor: '#5607f5',
    color: '#E9ECEF',
  },
  selectedDropdownItemtext: {
    color: 'white',
  },

  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dottedBox: {
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
    padding: 10,
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#5607f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonIcon: {
    marginRight: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductUploadScreen;
