import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
export default class loadingscreens extends React.Component {


    render() {
        return (
            <View style={styles.container}>
    <Text>Loading</Text>

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

