import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import * as firebase from 'firebase';
export default class loadingscreens extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
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

