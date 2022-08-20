import { SafeAreaView, View, TextInput, StyleSheet, Text,Pressable,Alert  } from "react-native";
import { useState,useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth,db } from './FirebaseApp';
import { collection, addDoc} from "firebase/firestore"


const BuyTicketScreen = ({route,navigation}) => {

    const [rerender,setRerender] = useState(false);
    const {movie} = route.params;
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [numberOfTickets, setnumberOfTickets] = useState(0);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [err, setError] = useState('');
    const [subtotal, setSubtotal] = useState(0.0);
    const [tax, setTax] = useState(0.0);
    const [total, setTotal] = useState(0.0);

    useEffect(()=>{
        const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
            if (userFromFirebaseAuth) {
              setLoggedInUser(userFromFirebaseAuth); 
              setEmail(userFromFirebaseAuth.email)   ;  
            }
            else {
              setLoggedInUser(null);
            }
          })
          return listener
      }, [])


    const calculate = (numberOfTickets1) =>
    {

        let subtotal1 = 12 * numberOfTickets1;
        let tax1 = subtotal1 * 0.13;
        let total1 = subtotal1 + tax1;
        setSubtotal(subtotal1);
        setTax(tax1.toFixed(2));
        setTotal(total1.toFixed(2));
        update();
    }

    const update = () => {
       setRerender(!rerender);  
    }

    const incrementClicked = () => {
        if(numberOfTickets == 10)
        {
            setError("Cannot set number of tickets as more than 10")
            return;
        }
        setError('');
        setnumberOfTickets(numberOfTickets+1);
        let tempTickets = numberOfTickets + 1;
        calculate(tempTickets);
    }

    const decrementClicked = () => {
        if(numberOfTickets == 0)
        {
            setError("Cannot set number of tickets as less than 0")
            return;
        }
        setError('');
        setnumberOfTickets(numberOfTickets-1);
        let tempTickets = numberOfTickets - 1;
        calculate(tempTickets);
    }

    const confirmPurchaseClicked = () => {
        
        if(email == '' || name == '')
        {
            setError("Email and name cannot be left blank");
            return;
        }

        if(numberOfTickets == 0)
        {
            setError("Invalid Number Of tickets");
            return;
        }

        setError("");

        try {
            const movieToInsert = {
                movieId:movie.id,
                movieName:movie.original_title,
                nameOnPurchase:name,
                numTickets:numberOfTickets,
                total:total,
                userId:loggedInUser.uid
            }
           const insertedMovie =   addDoc(collection(db, "movies"), movieToInsert)
           console.log(`Document created, id is: ${insertedMovie.id}`)
        }
        catch (err) {
            console.log(`${err.message}`)
        }

        Alert.alert("Purchase Success!");
        navigation.navigate("NowPlayingScreen");
    }


    return (
        <SafeAreaView>
            <Text style = {styles.heading}>Buy Tickets</Text>
            <Text style = {styles.movieTitle}>{movie.original_title}</Text>
            <Text style = {styles.label}>Your email address:</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter Email"
                keyboardType="email-address"
                value={email} 
                editable = {false}
            />
            <Text style = {styles.label}>Your name:</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter Name"
                keyboardType="default"
                onChangeText={setName}
                value={name}
            />
            <Text style = {styles.label}>Number of Tickets:</Text>
            <View style={styles.numberOfTicketsBtn}>
                <Pressable style={styles.increment} onPress={decrementClicked}>
                        <Text>-</Text>
                </Pressable>
                
                <Text style = {styles.label}>{numberOfTickets}</Text>
                
                <Pressable style={styles.increment} onPress={incrementClicked}>
                        <Text>+</Text>
                </Pressable>
            </View>
            
            <Text style={styles.errorMsg}>{err}</Text>

            
            {numberOfTickets>0 ? (
                <View>
                    <Text style = {styles.orderHeading}>Order Summary</Text>
                    <View style = {styles.orderBox}>
                        <Text>{movie.original_title}</Text>
                        <Text>Number of tickets: {numberOfTickets}</Text>
                        <Text>Subtotal: {subtotal}</Text>
                        <Text>Tax: {tax}</Text>
                        <Text style={styles.total}>Total: {total}</Text>
                    </View>
                </View>
            ) : null }
            <Pressable style={styles.confirmBtn} onPress={confirmPurchaseClicked}>
                        <Text>Confirm Purchase</Text>
            </Pressable>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    heading:{
        textAlign: 'center',
        fontSize: 30,
        margin: 10,
    },
    movieTitle:{
        textAlign: 'center',
        fontSize: 20,
        margin: 6,
    },
    input: {
        height: 40,
        width: 350,
        borderWidth: 1,
        margin: 6,
        padding: 10,
    },
    label: {
        marginLeft: 6,
        marginTop: 20,
        marginRight: 6,
    },
    increment:{
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        margin:5,
        padding:10,
        height:45,
        width:35,
        fontSize:20,
        color: 'white',
    },
    confirmBtn:{
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        margin:6,
        padding:10,
        height:45,
        width:150,
        fontSize:20,
        color: 'white',
    },
    numberOfTicketsBtn:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 110,
        height: 90,     
        marginTop: 11,

    },
    orderBox: {
        borderWidth:1,
        width: 300,
        marginLeft:6,
    },
    orderHeading: {
        marginTop:20,
        marginLeft: 6,
    },
    errorMsg: {
        marginTop: -30,
        marginLeft: 6,
    },
    total: {
        backgroundColor:'yellow',
    }
});


export default BuyTicketScreen;