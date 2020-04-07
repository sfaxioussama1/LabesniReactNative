import React from "react";
import {View, Text, StyleSheet, Image, FlatList} from "react-native";
import * as firebase from "firebase";
import {Ionicons} from "@expo/vector-icons";
import moment from "moment";
// posts = [
//     {
//         id: "1",
//         name: "Amir 1",
//         text: "héthya test1",
//         timestamp: 1569109273726,
//         avatar: require("../assets/tempAvatar.jpg"),
//         image: require("../assets/tempImage1.jpg")
//     },
//     {
//         id: "2",
//         name: "Amir 2",
//         text: "héthya test2",
//         timestamp: 1569109273726,
//         avatar: require("../assets/tempAvatar.jpg"),
//         image: require("../assets/tempImage2.jpg")
//     },
//     {
//         id: "3",
//         name: "Amir 3",
//         text: "héthya test3",
//         timestamp: 1569109273726,
//         avatar: require("../assets/tempAvatar.jpg"),
//         image: require("../assets/tempImage3.jpg")
//     },
//     {
//         id: "4",
//         name: "Amir 4",
//         text: "héthya test4",
//         timestamp: 1569109273726,
//         avatar: require("../assets/tempAvatar.jpg"),
//         image: require("../assets/tempImage4.jpg")
//     }
// ];


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
    constructor(props) {
        super(props);

        this.state = {
            photo_feed: [],
            refresh: false,
            loading: true
        }
    }

    componentDidMount = ()=> {
        this.loadFeed();


    }

    loadFeed = () => {
        this.setState({
            refresh: true,
            photo_feed: []
        });

        var that = this;
        firebase.database().ref('photos').orderByChild('posted').once('value').then(function (snapshot) {
            const exists = (snapshot.val() !== null);
            if (exists) data = snapshot.val();
            var photo_feed = this.state.photo_feed;
            for (var photo in data) {
                var photoObjt = data[photo];
                firebase.database().ref('users').child(photoObjt.author).once('value').then(function (snapshot) {
                    const exists = (snapshot.val() !== null);
                    if (exists) data = snapshot.val();
                    photo_feed.push({
                        id: photo,
                        url: photoObjt.url(),
                        caption: photoObjt.caption,
                        posted: photoObjt.posted,
                        authorUsername: data.username,
                        authorAvatar: data.avatar

                    });

                    that.setState({
                        refresh: false,
                        loading: false


                    });

                }).catch(error => console.log(error));
            }


        }).catch(error => console.log(error));


    }

    loadNew = () => {
        this.loadFeed();
    }


    // renderPost = post => {
    //     return (
    //         <View style={styles.labseniItem}>
    //             <Image source={post.authorAvatar} style={styles.avatar}/>
    //             <View style={{ flex: 1 }}>
    //                 <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
    //                     <View>
    //                         <Text style={styles.name}>{post.authorUsername}</Text>
    //                         <Text style={styles.timestamp}>{post.posted}</Text>
    //                     </View>
    //
    //                     <Ionicons name="ios-more" size={24} color="#73788B"/>
    //                 </View>
    //                 <Text style={styles.post}>{post.caption}</Text>
    //                 <Image source={{uri:post.url}} style={styles.postImage} resizeMode="cover"/>
    //                 <View style={{ flexDirection: "row" }}>
    //                     <Ionicons name="ios-heart-empty" size={24} color="#73788B" style={{ marginRight: 16 }}/>
    //                     <Ionicons name="ios-chatboxes" size={24} color="#73788B"/>
    //                 </View>
    //
    //             </View>
    //
    //         </View>
    //     );
    // };

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

                {this.state.loading == true ? (
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text>Loading ..</Text>
                    </View>

                ) : (



                <FlatList
                    refreshing={this.state.refresh}
                    onRefresh={this.loadNew}
                    style={styles.la}
                    data={this.state.photo_feed}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item,index }) => (

                              <View style={styles.labseniItem}>
                <Image source={item.authorAvatar} style={styles.avatar}/>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={styles.name}>{item.authorUsername}</Text>
                            <Text style={styles.timestamp}>{item.posted}</Text>
                        </View>

                        <Ionicons name="ios-more" size={24} color="#73788B"/>
                    </View>
                    <Text style={styles.post}>{item.caption}</Text>
                    <Image source={{uri:item.url}} style={styles.postImage} resizeMode="cover"/>
                    <View style={{ flexDirection: "row" }}>
                        <Ionicons name="ios-heart-empty" size={24} color="#73788B" style={{ marginRight: 16 }}/>
                        <Ionicons name="ios-chatboxes" size={24} color="#73788B"/>
                    </View>

                </View>

            </View>





                    )}

                ></FlatList>
                )
                }
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
        shadowOffset: {height: 5},
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
    labseniItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
    },
    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: "#838899"
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    }
});

