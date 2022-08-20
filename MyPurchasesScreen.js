import {StyleSheet, View, Text, Pressable ,ScrollView} from "react-native";
import { useState, useEffect } from 'react';

import { db } from "./FirebaseApp"
import { collection, getDocs,query,where } from "firebase/firestore";


import { auth } from './FirebaseApp';
import { onAuthStateChanged } from "firebase/auth";
import { useIsFocused } from '@react-navigation/native';
import { Fontisto } from '@expo/vector-icons';

const MyPurchasesScreen = ({navigation}) => {

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [textViewsToRender, setTextViewsToRender] = useState(null)
    const isFocused = useIsFocused();
    useEffect(()=>
    {
        //getListOfPurchases()
        const listener = onAuthStateChanged(auth, userFromFirebaseAuth => 
        {
            if (userFromFirebaseAuth) 
            {
                console.log("checking..." + userFromFirebaseAuth.uid);
                setLoggedInUser(userFromFirebaseAuth);   
                getListOfPurchases()   
            }
            else
            {
                setLoggedInUser(null);
            }
        })
        return listener
    }, [[isFocused]])

    const getListOfPurchases = async () => {
        try {
            const query1 = query(collection(db, "movies"), where("userId", "==",loggedInUser.uid));
            console.log("*************" + loggedInUser.uid);
            const querySnapshot = await getDocs(query1);

            // retreive the documents in the snapshot
            // - an array of documents
            const documents = querySnapshot.docs

            // generating an array of <Text> elements
            // -  one TextView per document in the collection
            const textViewElementsArray = documents.map((currDoc)=>
            {
                return (
                        <View key={currDoc.id} style = {styles.purchasesBox}>
                            <View style={styles.rowBox}>
                                <Fontisto name="ticket" size={50} color="black" style = {{marginRight:10}}/>
                                <View>
                                    <Text style = {{fontSize:20,marginTop:-10}}>{currDoc.data().movieName}</Text>
                                    <Text >Num Tickets: {currDoc.data().numTickets}</Text>
                                    <Text style={styles.totalPaid}>Total Paid: {currDoc.data().total}</Text>
                                </View>
                            </View>
                            <View style={styles.horizontalLine}/>                  
                        </View>
                )
            })
            // update the state variables
            setTextViewsToRender(textViewElementsArray)

        } catch (err) {
            console.log(`${err.message}`)        
        }

    }

    
    const loginCreateNewAccountPressed = () => {
        navigation.navigate("LoginScreen");
    }

    return (
        <ScrollView>
            <View style={{flex:1, backgroundColor:'#fff'}}>
                { (loggedInUser===null) && (
                    <View style={styles.container}>
                        <Text style={{fontSize:25, marginBottom:20}}>Your Tickets</Text>
                        <Text style={{fontSize:16}}>You must be logged in to use this feature.</Text>
                        <Pressable onPress={loginCreateNewAccountPressed}>
                            <Text style={styles.createNewAccountPressable}>Login or Create New Account</Text>
                        </Pressable>
                    </View>
                )}

                { !(loggedInUser===null) && (
                    <View >
                        <Text style={styles.heading}>Your Purchases</Text>
                            {textViewsToRender}
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 40,
        justifyContent: 'center',
    },
    heading: {
        marginBottom: 30,
        fontSize: 35,
        textAlign:'center',
    },
    createNewAccountPressable: {
        textAlign: 'center',
        backgroundColor: '#ff5050',
        color: '#ffffff',
        margin: 10,
        fontSize: 18,
        padding: 15,
        width: 380,
    },
    purchasesBox: {
        width:300,
        marginTop:10,
        alignSelf:'center'
    },
    rowBox: {
        flexDirection: 'row',
    },
    horizontalLine: {  
        marginTop:15,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    totalPaid: {
        color:'red',
    },
});

export default MyPurchasesScreen;
