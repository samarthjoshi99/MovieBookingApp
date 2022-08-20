import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import { auth } from "./FirebaseApp";
import { signOut } from "firebase/auth";
import { StackActions } from "@react-navigation/native";

const LogoutScreen = ({navigation}) => {
    const logoutPressed = async () => {
        try {
            await signOut(auth)
            navigation.dispatch(StackActions.popToTop());
        } catch (err) {
            console.log(`Logout failed: ${err.message}`);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize:25}}>Are you ready to logout?</Text>
            <Pressable onPress={logoutPressed}>
                <Text style={styles.logoutPressable}>Logout</Text>
            </Pressable>
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
    logoutPressable: {
        textAlign: 'center',
        backgroundColor: '#ff5050',
        color: '#ffffff',
        margin: 10,
        fontSize: 18,
        padding: 15,
        width: 380,
    },
});

export default LogoutScreen;