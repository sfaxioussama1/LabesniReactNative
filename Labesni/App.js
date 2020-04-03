// App.js
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {Ionicons} from "@expo/vector-icons";
import loadingscreens from "./screens/loadingscreens";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";

import MessageScreen from "./screens/MessageScreen";
import PostScreen from "./screens/PostScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import * as firebase from 'firebase';
import {decode, encode} from 'base-64'

if (!global.btoa) {
    global.btoa = encode
}

if (!global.atob) {
    global.atob = decode
}
// héthya firebase configuration
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


const AppContainer = createStackNavigator(
    {
        default: createBottomTabNavigator(
            {
                Home: {
                    screen: HomeScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={24} color={tintColor}/>
                    }
                },
                Message: {
                    screen: MessageScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name="ios-chatboxes" size={24} color={tintColor}/>
                    }
                },
                Post: {
                    screen: PostScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => (
                            <Ionicons
                                name="ios-add-circle"
                                size={48}
                                color="#E9446A"
                                style={{
                                    shadowColor: "#E9446A",
                                    shadowOffset: { width: 0, height: 10 },
                                    shadowRadius: 10,
                                    shadowOpacity: 0.3
                                }}
                            />
                        )
                    }
                },
                Notification: {
                    screen: NotificationScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name="ios-notifications" size={24} color={tintColor}/>
                    }
                },
                Profile: {
                    screen: ProfileScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name="ios-person" size={24} color={tintColor}/>
                    }
                }
            },
            {
                defaultNavigationOptions: {
                    tabBarOnPress: ({navigation, defaultHandler}) => {
                        if (navigation.state.key === "Post") {
                            navigation.navigate("postModal");
                        } else {
                            defaultHandler();
                        }
                    }
                },
                tabBarOptions: {
                    activeTintColor: "#161F3D",
                    inactiveTintColor: "#B8BBC4",
                    showLabel: false
                }
            }
        ),
        postModal: {
            screen: PostScreen
        }
    },
    {
        mode: "modal",
        headerMode: "none",

    }
);

const AuthStack = createStackNavigator({
        Login: LoginScreen,
        Register: RegisterScreen


    },
    {
        initialRouteName:"Register"
    }
);

export default createAppContainer(
    createSwitchNavigator(
        {
            loading: loadingscreens,
            App: AppContainer,
            Auth: AuthStack

        },
        {
            initialRouteName: "loading"
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
