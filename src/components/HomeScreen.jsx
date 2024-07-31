// import React, {useEffect, useState} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {
//   View,
//   ScrollView,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
import Service from './CardServ/Service';

const Stack = createNativeStackNavigator();

// const MyScreen = ({navigation}) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://admakerwithoutbcrypt.onrender.com/getProduct');
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <ScrollView style={styles.container}>
//       {products.length > 0 ? (
//         products.map(product => (
//           <View key={product.servId} style={styles.card}>
//             {/* <Image source={{uri: product.img}} style={styles.image} /> */}
//             <Text style={styles.title}>{product.title}</Text>
//             <Text style={styles.price}>{product.price}</Text>
//             <Text style={styles.description}>{product.description}</Text>
//             <Text style={styles.category}>{product.category}</Text>
//             <Text style={styles.location}>{product.location}</Text>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() =>
//                 navigation.navigate('Service', {
//                   img: product.img,
//                   title: product.title,
//                   price: product.price,
//                   description: product.description,
//                   category: product.category,
//                   location: product.location,
//                 })
//               }>
//               <Text style={styles.buttonText}>View Service</Text>
//             </TouchableOpacity>
//           </View>
//         ))
//       ) : (
//         <Text style={styles.loadingText}>Loading products...</Text>
//       )}
//     </ScrollView>
//   );
// };

// const HomeScreen = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="MyScreen"
//       screenOptions={{headerShown: false}}>
//       <Stack.Screen
//         name="MyScreen"
//         options={{headerShown: false}}
//         component={MyScreen}
//       />
//       <Stack.Screen
//         name="Service"
//         options={{headerShown: false}}
//         component={Service}
//       />
//     </Stack.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   card: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 16,
//     margin: 16,
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 8,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 8,
//   },
//   price: {
//     fontSize: 16,
//     color: '#888',
//   },
//   description: {
//     fontSize: 14,
//     color: '#666',
//   },
//   category: {
//     fontSize: 14,
//     color: '#666',
//   },
//   location: {
//     fontSize: 14,
//     color: '#666',
//   },
//   button: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: '#007bff',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   loadingText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default HomeScreen;
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
import ProductList from './CardServ/ProductList';

// const Stack = createStackNavigator();

const HomeScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyScreen" component={MyScreen} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="Service" component={Service} />
    </Stack.Navigator>
  );
};

// const MyScreen = ({navigation}) => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState({
//     carService: [],
//     hairSalon: [],
//     others: [],
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://admakerwithoutbcrypt.onrender.com/getProduct');
//         const data = await response.json();
//         categorizeProducts(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const categorizeProducts = products => {
//     const categorized = {
//       carService: [],
//       hairSalon: [],
//       others: [],
//     };

//     products.forEach(product => {
//       switch (product.category.toLowerCase()) {
//         case 'car service':
//           categorized.carService.push(product);
//           break;
//         case 'hair salon':
//           categorized.hairSalon.push(product);
//           break;
//         default:
//           categorized.others.push(product);
//       }
//     });

//     setCategories(categorized);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <TouchableOpacity
//         style={styles.card}
//         onPress={() =>
//           navigation.navigate('ProductList', {
//             products: categories.carService,
//             category: 'Car Service',
//           })
//         }>
//         <Text style={styles.title}>Car Service</Text>
//         <Text style={styles.count}>Count: {categories.carService.length}</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.card}
//         onPress={() =>
//           navigation.navigate('ProductList', {
//             products: categories.hairSalon,
//             category: 'Hair Salon',
//           })
//         }>
//         <Text style={styles.title}>Hair Salon</Text>
//         <Text style={styles.count}>Count: {categories.hairSalon.length}</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.card}
//         onPress={() =>
//           navigation.navigate('ProductList', {
//             products: categories.others,
//             category: 'Others',
//           })
//         }>
//         <Text style={styles.title}>Others</Text>
//         <Text style={styles.count}>Count: {categories.others.length}</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };
const MyScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({
    rental: [],
    babysitter: [],
    car: [],
    otherServices: [],
    job: [],
    hairStylist: [],
    buySell: [],
    realEstateAgent: [],
    tutor: [],
    market: [],
    cafe: [],
    cook: [],
    lawyer: [],
    taxServices: [],
    datingMarriage: [],
    drivingSchool: [],
    cellPhoneMan: [],
    restaurant: [],
    remodeling: [],
    event: [],
    preschoolDaycare: [],
    electrician: [],
    plumber: [],
    others: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://admakerwithoutbcrypt.onrender.com/getProduct',
        );
        const data = await response.json();
        categorizeProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const categorizeProducts = products => {
    const categorized = {
      rental: [],
      babysitter: [],
      car: [],
      otherServices: [],
      job: [],
      hairStylist: [],
      buySell: [],
      realEstateAgent: [],
      tutor: [],
      market: [],
      cafe: [],
      cook: [],
      lawyer: [],
      taxServices: [],
      datingMarriage: [],
      drivingSchool: [],
      cellPhoneMan: [],
      restaurant: [],
      remodeling: [],
      event: [],
      preschoolDaycare: [],
      electrician: [],
      plumber: [],
      others: [],
    };

    products.forEach(product => {
      switch (product.category.toLowerCase()) {
        case 'rental':
          categorized.rental.push(product);
          break;
        case 'babysitter':
          categorized.babysitter.push(product);
          break;
        case 'car':
          categorized.car.push(product);
          break;
        case 'other services':
          categorized.otherServices.push(product);
          break;
        case 'job':
          categorized.job.push(product);
          break;
        case 'hair stylist':
          categorized.hairStylist.push(product);
          break;
        case 'buy & sell':
          categorized.buySell.push(product);
          break;
        case 'real estate agent':
          categorized.realEstateAgent.push(product);
          break;
        case 'tutor':
          categorized.tutor.push(product);
          break;
        case 'market':
          categorized.market.push(product);
          break;
        case 'cafe':
          categorized.cafe.push(product);
          break;
        case 'cook':
          categorized.cook.push(product);
          break;
        case 'lawyer':
          categorized.lawyer.push(product);
          break;
        case 'tax services':
          categorized.taxServices.push(product);
          break;
        case 'dating & marriage':
          categorized.datingMarriage.push(product);
          break;
        case 'driving school':
          categorized.drivingSchool.push(product);
          break;
        case 'cell phone man':
          categorized.cellPhoneMan.push(product);
          break;
        case 'restaurant':
          categorized.restaurant.push(product);
          break;
        case 'remodeling':
          categorized.remodeling.push(product);
          break;
        case 'event':
          categorized.event.push(product);
          break;
        case 'preschool & daycare':
          categorized.preschoolDaycare.push(product);
          break;
        case 'electrician':
          categorized.electrician.push(product);
          break;
        case 'plumber':
          categorized.plumber.push(product);
          break;
        default:
          categorized.others.push(product);
          break;
      }
    });

    setCategories(categorized);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainBox}>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.others,
              category: 'Others',
            })
          }>
          <Text style={styles.title}>Others</Text>
          <Text style={styles.count}>Count: {categories.others.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.car,
              category: 'Car',
            })
          }>
          <Text style={styles.title}>Car</Text>
          <Text style={styles.count}>Count: {categories.car.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.hairStylist,
              category: 'Hair Stylist',
            })
          }>
          <Text style={styles.title}>Hair Stylist</Text>
          <Text style={styles.count}>
            Count: {categories.hairStylist.length}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.buySell,
              category: 'Buy & Sell',
            })
          }>
          <Text style={styles.title}>Buy & Sell</Text>
          <Text style={styles.count}>Count: {categories.buySell.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.realEstateAgent,
              category: 'Real Estate Agent',
            })
          }>
          <Text style={styles.title}>Real Estate Agent</Text>
          <Text style={styles.count}>
            Count: {categories.realEstateAgent.length}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.tutor,
              category: 'Tutor',
            })
          }>
          <Text style={styles.title}>Tutor</Text>
          <Text style={styles.count}>Count: {categories.tutor.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.market,
              category: 'Market',
            })
          }>
          <Text style={styles.title}>Market</Text>
          <Text style={styles.count}>Count: {categories.market.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.cafe,
              category: 'Cafe',
            })
          }>
          <Text style={styles.title}>Cafe</Text>
          <Text style={styles.count}>Count: {categories.cafe.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.cook,
              category: 'Cook',
            })
          }>
          <Text style={styles.title}>Cook</Text>
          <Text style={styles.count}>Count: {categories.cook.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.lawyer,
              category: 'Lawyer',
            })
          }>
          <Text style={styles.title}>Lawyer</Text>
          <Text style={styles.count}>Count: {categories.lawyer.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.taxServices,
              category: 'Tax Services',
            })
          }>
          <Text style={styles.title}>Tax Services</Text>
          <Text style={styles.count}>
            Count: {categories.taxServices.length}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.datingMarriage,
              category: 'Dating & Marriage',
            })
          }>
          <Text style={styles.title}>Dating & Marriage</Text>
          <Text style={styles.count}>
            Count: {categories.datingMarriage.length}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.drivingSchool,
              category: 'Driving School',
            })
          }>
          <Text style={styles.title}>Driving School</Text>
          <Text style={styles.count}>
            Count: {categories.drivingSchool.length}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.cellPhoneMan,
              category: 'Cell Phone Man',
            })
          }>
          <Text style={styles.title}>Cell Phone Man</Text>
          <Text style={styles.count}>
            Count: {categories.cellPhoneMan.length}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.restaurant,
              category: 'Restaurant',
            })
          }>
          <Text style={styles.title}>Restaurant</Text>
          <Text style={styles.count}>
            Count: {categories.restaurant.length}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.remodeling,
              category: 'Remodeling',
            })
          }>
          <Text style={styles.title}>Remodeling</Text>
          <Text style={styles.count}>
            Count: {categories.remodeling.length}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.event,
              category: 'Event',
            })
          }>
          <Text style={styles.title}>Event</Text>
          <Text style={styles.count}>Count: {categories.event.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.preschoolDaycare,
              category: 'Preschool & Daycare',
            })
          }>
          <Text style={styles.title}>Preschool & Daycare</Text>
          <Text style={styles.count}>
            Count: {categories.preschoolDaycare.length}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.electrician,
              category: 'Electrician',
            })
          }>
          <Text style={styles.title}>Electrician</Text>
          <Text style={styles.count}>
            Count: {categories.electrician.length}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductList', {
              products: categories.plumber,
              category: 'Plumber',
            })
          }>
          <Text style={styles.title}>Plumber</Text>
          <Text style={styles.count}>Count: {categories.plumber.length}</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 100, width: '100%'}}></View>
      {/* Add more TouchableOpacity components for other categories */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d2d4fc',
  },
  mainBox: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',

    width: 400,
    flexWrap: 'wrap',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    backgroundColor: 'white',
    width: 150,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  count: {
    fontSize: 16,
    color: '#888',
  },
});

export default HomeScreen;
