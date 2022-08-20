import { useState } from "react";
import { View, Text, SafeAreaView, TextInput, Pressable, StyleSheet } from "react-native";
import { auth } from "./FirebaseApp";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { StackActions } from "@react-navigation/native";

const LoginScreen = ({navigation}) => {
    const [emailAddress, onEmailChanged] = useState('');
    const [password, onPasswordChanged] = useState('');
    const [error, onErrorChanged] = useState('');
    const [hasError, onHasErrorChanged] = useState(false);

    const loginPressed = async () => {
        try {
            onHasErrorChanged(false);
            await signInWithEmailAndPassword(auth, emailAddress, password);
            navigation.dispatch(StackActions.pop(1)); 
        } catch (err) {
            onErrorChanged(err.message);
            onHasErrorChanged(true);
        }
    }
    const createNewAccountPressed = async () => {
        try {
            onHasErrorChanged(false);
            await createUserWithEmailAndPassword(auth, emailAddress, password);
            navigation.dispatch(StackActions.pop(1)); 
        } catch (err) {
            onErrorChanged(err.message);
            onHasErrorChanged(true);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize:24}}>Login to Your Account</Text>
            <Text style={{fontSize:18}}>You must be logged in to use this feature.</Text>

            <View style={{marginTop:20}}>
                <Text style={{marginBottom:5, fontSize:16}}>Email address:</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={onEmailChanged}
                    value={emailAddress}
                />
            </View>

            <View style={{marginTop:10}}>
                <Text style={{marginBottom:5, fontSize:16}}>Password:</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter password"
                    keyboardType="default"
                    autoCapitalize="none"
                    onChangeText={onPasswordChanged}
                    value={password}
                    secureTextEntry={true}
                />
            </View>

            { hasError && (
            <Text style={styles.errorStyle}>{error}</Text>
            )}

            <View style={{marginTop:20}}>
                <Pressable onPress={loginPressed}>
                    <Text style={styles.loginPressable}>Login</Text>
                </Pressable>
                <Pressable onPress={createNewAccountPressed}>
                    <Text style={styles.createNewAccountPressable}>Create New Account</Text>
                </Pressable>
            </View>
        </SafeAreaView>
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
    input: {
        height: 40,
        width: 350,
        borderWidth: 1,
        padding: 10,
        borderColor: '#808080',
    },
    loginPressable: {
        textAlign: 'center',
        backgroundColor: '#ff5050',
        color: '#ffffff',
        margin: 22,
        fontSize: 18,
        padding: 10,
        width: 350,
    },
    createNewAccountPressable: {
        textAlign: 'center',
        backgroundColor: '#ffffff',
        color: '#ff5050',
        borderColor: '#ff5050',
        borderStyle: 'solid',
        borderWidth: 1,
        margin: 22,
        fontSize: 18,
        padding: 10,
        width: 350,
    },
    errorStyle: {
        color: '#000000',
        backgroundColor: '#FFD884',
        borderColor: '#FFAE00',
        borderStyle: 'solid',
        borderWidth: 1,
        width: 400,
        padding: 10,
        marginTop: 10,
    }
});

export default LoginScreen;