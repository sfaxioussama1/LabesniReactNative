import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import firebase from "firebase";
import {f, auth, database, storage} from "../config/config.js"
export default class loadingscreens extends React.Component {
login = async() => {
    try {
        let user = await auth.signInWithEmailAndPassword('example.user@gmail.com','123456');

    }catch(error){
         console.log(error)
    }
};

    constructor(props){
        super(props);
        this.login();
    }

    componentDidMount() {
        f.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth");
        });
    }
    render() {
        return (
            <View style={styles.container}>
    <Text>9a3ed y loadi</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

