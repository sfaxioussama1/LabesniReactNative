import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
export default class LoginScreen extends React.Component {


    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>

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

