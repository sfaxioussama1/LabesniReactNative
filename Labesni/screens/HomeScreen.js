import React from "react";
import {View, Text, StyleSheet, Image, FlatList, TouchableOpacity} from "react-native";

import {Ionicons} from "@expo/vector-icons";
import {f, auth, database, storage} from "../config/config.js"
import PhotoList from '../components/photoList.js'

import moment from "moment";
import {YellowBox} from 'react-native';
import _ from 'lodash';
import withUnmounted from '@ishawnwang/withunmounted'

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};
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
    //
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         photo_feed: [],
    //         refresh: false,
    //         loading: true
    //     }
    //
    // }
    //
    //
    // componentDidMount = ()=> {
    //     this.loadFeed();
    //
    //
    //     // callAPI_or_DB().then(result => {
    //     //     if (this._isMounted) {
    //     //         this.setState({isLoading: false})
    //     //     }
    //     // });
    //
    //
    // };
    //
    //
    //
    // checkTime = (s) => {
    //     if (s == 1) {
    //         return 'ago';
    //     } else {
    //         return 's ago';
    //     }
    //
    // };
    //
    // timeConverter = (timestamp) => {
    //     var a = new Date(timestamp * 1000);
    //     var seconds = Math.floor((new Date() - a ) / 1000);
    //
    //     var interval = Math.floor(seconds / 31536000);
    //     if (interval > 1) {
    //         return interval + ' year ' + this.checkTime(interval);
    //     }
    //
    //     interval = Math.floor(seconds / 2592000);
    //
    //     if (interval > 1) {
    //         return interval + ' month ' + this.checkTime(interval);
    //     }
    //
    //     interval = Math.floor(seconds / 86400);
    //
    //     if (interval > 1) {
    //         return interval + ' day ' + this.checkTime(interval);
    //     }
    //
    //     interval = Math.floor(seconds / 3600);
    //
    //     if (interval > 1) {
    //         return interval + ' hour ' + this.checkTime(interval);
    //     }
    //
    //     interval = Math.floor(seconds / 60);
    //
    //     if (interval > 1) {
    //         return interval + ' minute ' + this.checkTime(interval);
    //     }
    //
    //     return Math.floor(seconds) + ' second ' + this.checkTime(seconds);
    //
    //
    // };
    //
    // addToFlatlist = (photo_feed, data, photo) => {
    //     var that = this;
    //
    //     var photoObjt = data[photo];
    //     database.ref('users').child(photoObjt.author).once('value').then(function (snapshot) {
    //         const exists = (snapshot.val() !== null);
    //         if (exists) data = snapshot.val();
    //         photo_feed.push({
    //             id: photo,
    //             url: photoObjt.url,
    //             caption: photoObjt.caption,
    //             posted: that.timeConverter(photoObjt.posted),
    //             authorUsername: data.username,
    //             authorAvatar: data.avatar,
    //             authorId: photoObjt.author
    //
    //         });
    //         that.setState({
    //             refresh: false,
    //             loading: false
    //
    //
    //         });
    //
    //     }).catch(error => console.log(error));
    //
    //
    // }
    //
    // loadFeed = () => {
    //     this.setState({
    //         refresh: true,
    //         photo_feed: []
    //     });
    //     var that = this;
    //     database.ref('photos').orderByChild('posted').once('value').then(function (snapshot) {
    //         const exists = (snapshot.val() !== null);
    //         if (exists) data = snapshot.val();
    //         var photo_feed = that.state.photo_feed;
    //         for (var photo in data) {
    //             that.addToFlatlist(photo_feed, data, photo);
    //         }
    //
    //
    //     }).catch(error => console.log(error));
    //
    //
    // };
    //
    // loadNew = () => {
    //     this.loadFeed();
    // };


// state = { email: "", displayName: "" };
// componentDidMount() {
//     const { email, displayName } = firebase.auth().currentUser;
//
//     this.setState({ email, displayName });
// }
// signOutUser = () => {
//     firebase.auth().signOut();
// };

// renderPost = post => {
//     return (
//         <View style={styles.labseniItem}>
//             <Image source={post.avatar} style={styles.avatar}/>
//             <View style={{ flex: 1 }}>
//                 <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//                     <View>
//                         <Text style={styles.name}>{post.name}</Text>
//                         <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
//                     </View>
//
//                     <Ionicons name="ios-more" size={24} color="#73788B"/>
//                 </View>
//                 <Text style={styles.post}>{post.text}</Text>
//                 <Image source={post.image} style={styles.postImage} resizeMode="cover" />
//                 <View style={{ flexDirection: "row" }}>
//                     <Ionicons name="ios-heart-empty" size={24} color="#73788B" style={{ marginRight: 16 }} />
//                     <Ionicons name="ios-chatboxes" size={24} color="#73788B" />
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

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Labseni</Text>

                </View>
                <PhotoList isUser={false} navigation={this.props.navigation}/>

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

