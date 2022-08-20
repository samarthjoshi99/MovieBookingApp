import { StyleSheet, Text, View, Pressable, Image ,ScrollView} from "react-native";
import { Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { auth } from './FirebaseApp';
import { onAuthStateChanged } from "firebase/auth";

const MovieDetailsScreen = ({route,navigation}) => {
    const {movie} = route.params;
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

    const buyTicketPressed = () => {
        navigation.navigate("BuyTicketScreen", {movie: movie});
    }

    const loginCreateNewAccountPressed = () => {
        navigation.navigate("LoginScreen");
    }

    return (
        <ScrollView>
            <View style={{flexDirection:'column', height:'100%', justifyContent:'space-between', backgroundColor:'#fff'}}>
                <View>
                    <Image source={{uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`}} style={styles.poster}/>
                    <View style={{padding:10}}>
                        <View style={styles.movieTitle}>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>{movie.title}</Text>
                            <View style={{flexDirection:'row', alignContent:'center'}}>
                                <Text style={{fontSize:25}}>{movie.vote_average*10}%</Text>
                                <Entypo name="star" size={30} color="#FFD700" />
                            </View>
                        </View>
                        <Text style= {{fontSize:20}}>{movie.release_date}</Text>
                        <Text style={{marginTop:20, fontWeight:'bold', fontSize:20}}>Plot Summary</Text>
                        <Text>{movie.overview}</Text>
                    </View>
                </View>
                { (loggedInUser===null) && (
                    <View style={{padding:10}}>
                        <Text style={{alignSelf:'center'}}>You must be logged in to use this feature.</Text>
                        <Pressable>
                            <Text style={styles.buyTicket}>Buy Tickets</Text>
                        </Pressable>
                        <Pressable onPress={loginCreateNewAccountPressed}>
                            <Text style={styles.loginCreateNewAccount}>Login or Create New Account</Text>
                        </Pressable>
                    </View>
                )}
                { !(loggedInUser===null) && (
                    <View style={{padding:10}}>
                        <Pressable onPress={buyTicketPressed}>
                            <Text style={styles.buyTicketLoggedIn}>Buy Tickets</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    movieTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    buyTicket: {
        textAlign: 'center',
        backgroundColor: '#cccccc',
        color: '#7393B3',
        borderColor: '#808080',
        borderStyle: 'solid',
        borderWidth: 1,
        fontSize: 18,
        padding: 15,
        width: '100%',
        marginTop: 10,
    },
    buyTicketLoggedIn: {
        textAlign: 'center',
        backgroundColor: '#ff5050',
        color: '#ffffff',
        fontSize: 18,
        padding: 15,
        width: '100%',
        marginTop: 10,
    },
    loginCreateNewAccount: {
        textAlign: 'center',
        backgroundColor: '#ff5050',
        color: '#ffffff',
        fontSize: 18,
        padding: 15,
        width: '100%',
        marginTop: 10,
    },
    buyTicketLoggedIn: {
        textAlign: 'center',
        backgroundColor: '#ff5050',
        color: '#ffffff',
        fontSize: 18,
        padding: 15,
        width: '100%',
        marginTop: 10,
    },
    poster: {
        width: '100%',
        height: 280,
    },
});

export default MovieDetailsScreen;