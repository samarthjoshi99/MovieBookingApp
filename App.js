import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { auth } from './FirebaseApp';
import { onAuthStateChanged } from "firebase/auth";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, Fontisto } from '@expo/vector-icons';
import LogoutScreen from './LogoutScreen';
import { NowPlayingScreenNavigator, MyPurchasesScreenNavigator } from './NavigationController';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(()=>{
    const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
        if (userFromFirebaseAuth) {
          setLoggedInUser(userFromFirebaseAuth);      
        }
        else {
          setLoggedInUser(null);
        }
      })
      return listener
  }, [])

  return (
    <NavigationContainer>
      {
        (loggedInUser === null)
        ?
        (
          <Tab.Navigator
            screenOptions={ ({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'MyPurchasesStackScreen') {
                  return <Fontisto name='ticket' size={size} color={color}/>;
                } 
                else {
                  return <AntDesign name='bars' size={size} color={color} />;
                }
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            })}
          >
            <Tab.Screen name="NowPlayingStackScreen" component={NowPlayingScreenNavigator}/>
            <Tab.Screen name="MyPurchasesStackScreen" component={MyPurchasesScreenNavigator} />
          </Tab.Navigator>
        )
        :
        (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'MyPurchasesStackScreen') {
                  return <Fontisto name='ticket' size={size} color={color}/>;
                } 
                else if (route.name === 'NowPlayingStackScreen') {
                  return <AntDesign name='bars' size={size} color={color} />;
                }
                else {
                  return <Ionicons name='person-outline' size={size} color={color} />;
                }
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            })}
          >
            <Tab.Screen name="NowPlayingStackScreen" component={NowPlayingScreenNavigator}/>
            <Tab.Screen name="MyPurchasesStackScreen" component={MyPurchasesScreenNavigator} />
            <Tab.Screen name="LogoutScreen" component={LogoutScreen}/>
          </Tab.Navigator>
        )
      }
    </NavigationContainer>
  );
}
