import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import loadingscreens from "./screens/loadingscreens";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";

import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC9FemRYyjg09dAZ2K6Qf0q_IoKDlLkcUw",
    authDomain: "projetlabesni.firebaseapp.com",
    databaseURL: "https://projetlabesni.firebaseio.com",
    projectId: "projetlabesni",
    storageBucket: "projetlabesni.appspot.com",
    messagingSenderId: "680868658843",
    appId: "1:680868658843:web:2b911e8ad58ed55fea103e",
    measurementId: "G-248T43CJVX"
};
firebase.initializeApp(firebaseConfig);


const AppStack = createStackNavigator({
    Home : HomeScreen

});

const AuthStack = createStackNavigator({
    Register : RegisterScreen,
    Login:LoginScreen

});

export default createAppContainer(

    createSwitchNavigator(
        {
            loading : loadingscreens,
            App: AppStack,
            Auth : AuthStack

        },
        {
            initialRouteName : "loading"
        }

    )
)




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
