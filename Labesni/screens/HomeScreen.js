import React from "react";
import {View, Text, StyleSheet, Image, FlatList} from "react-native";
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
posts = [
    {
        id: "1",
        name: "Amir 1",
        text:
            "héthya test1",
        timestamp: 1569109273726,
        avatar: require("../assets/tempAvatar.jpg"),
        image: require("../assets/tempImage1.jpg")
    },
    {
        id: "2",
        name: "Amir 2",
        text:
            "héthya test2",
        timestamp: 1569109273726,
        avatar: require("../assets/tempAvatar.jpg"),
        image: require("../assets/tempImage2.jpg")
    },
    {
        id: "3",
        name: "Amir 3",
        text:
            "héthya test3",
        timestamp: 1569109273726,
        avatar: require("../assets/tempAvatar.jpg"),
        image: require("../assets/tempImage3.jpg")
    },
    {
        id: "4",
        name: "Amir 4",
        text:
            "héthya test4",
        timestamp: 1569109273726,
        avatar: require("../assets/tempAvatar.jpg"),
        image: require("../assets/tempImage4.jpg")
    }
];



export default class HomeScreen extends React.Component {
    // state = { email: "", displayName: "" };
    // componentDidMount() {
    //     const { email, displayName } = firebase.auth().currentUser;
    //
    //     this.setState({ email, displayName });
    // }
    // signOutUser = () => {
    //     firebase.auth().signOut();
    // };

    renderPost = post => {
        return (
            <View>

                <Text>I'm a POST</Text>
            </View>
        );
    };
    render() {
        // LayoutAnimation.easeInEaseOut();

        return (
            // <View style={styles.container}>
            //     <Text>Hi {this.state.email}!</Text>
            //
            //     <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
            //         <Text>Logout</Text>
            //     </TouchableOpacity>
            //
            // </View>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Labseni</Text>

                </View>

                <FlatList
                    style={styles.la}
                    data={posts}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                ></FlatList>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBECF4"
    },
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500"
    },
    la: {
        marginHorizontal: 16
    },

});

