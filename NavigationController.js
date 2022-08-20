import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NowPlayingScreen from './NowPlayingScreen';
import MovieDetailsScreen from './MovieDetailsScreen';
import LoginScreen from './LoginScreen';
import BuyTicketScreen from './BuyTicketScreen';
import MyPurchasesScreen from './MyPurchasesScreen';

const Stack = createNativeStackNavigator();

const NowPlayingScreenNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="NowPlayingScreen" component={NowPlayingScreen}/>
            <Stack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen}/>
            <Stack.Screen name="BuyTicketScreen" component={BuyTicketScreen}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        </Stack.Navigator>
    )
}

export {NowPlayingScreenNavigator};

const MyPurchasesScreenNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="MyPurchasesScreen" component={MyPurchasesScreen}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        </Stack.Navigator>
    )
}

export {MyPurchasesScreenNavigator};