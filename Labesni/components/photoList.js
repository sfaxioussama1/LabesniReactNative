import React from "react";
import {Ionicons} from "@expo/vector-icons";
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList} from "react-native";
import {f, auth, database, storage} from "../config/config.js";

class PhotoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photo_feed: [],
            refresh: false,
            loading: true
        }
    }

    componentDidMount = () => {

        const {isUser, userId}= this.props;
        if (isUser == true) {
            this.loadFeed(userId);
        } else {
            this.loadFeed('')
        }

    };

    checkTime = (s) => {
        if (s == 1) {
            return 'ago';
        } else {
            return 's ago';
        }

    };

    timeConverter = (timestamp) => {
        var a = new Date(timestamp * 1000);
        var seconds = Math.floor((new Date() - a ) / 1000);

        var interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + ' year ' + this.checkTime(interval);
        }

        interval = Math.floor(seconds / 2592000);

        if (interval > 1) {
            return interval + ' month ' + this.checkTime(interval);
        }

        interval = Math.floor(seconds / 86400);

        if (interval > 1) {
            return interval + ' day ' + this.checkTime(interval);
        }

        interval = Math.floor(seconds / 3600);

        if (interval > 1) {
            return interval + ' hour ' + this.checkTime(interval);
        }

        interval = Math.floor(seconds / 60);

        if (interval > 1) {
            return interval + ' minute ' + this.checkTime(interval);
        }

        return Math.floor(seconds) + ' second ' + this.checkTime(seconds);


    };

    addToFlatlist = (photo_feed, data, photo) => {
        var that = this;

        var photoObjt = data[photo];
        database.ref('users').child(photoObjt.author).once('value').then(function (snapshot) {
            const exists = (snapshot.val() !== null);
            if (exists) data = snapshot.val();
            photo_feed.push({
                id: photo,
                url: photoObjt.url,
                caption: photoObjt.caption,
                posted: that.timeConverter(photoObjt.posted),
                authorUsername: data.username,
                authorAvatar: data.avatar,
                authorId: photoObjt.author

            });
            that.setState({
                refresh: false,
                loading: false


            });

        }).catch(error => console.log(error));


    };

    loadFeed = (userId = '') => {
        this.setState({
            refresh: true,
            photo_feed: []
        });
        var that = this;

        var loadRef = database.ref('photos');
        if(userId!=''){
            loadRef = database.ref('users').child(userId).child('photos');
        }
        loadRef.orderByChild('posted').once('value').then(function (snapshot) {
            const exists = (snapshot.val() !== null);
            if (exists) data = snapshot.val();
            var photo_feed = that.state.photo_feed;
            for (var photo in data) {
                that.addToFlatlist(photo_feed, data, photo);
            }


        }).catch(error => console.log(error));


    };

    loadNew = () => {
        this.loadFeed();
    };


    render() {
        // LayoutAnimation.easeInEaseOut();

        return (

            <View style={styles.container}>
                {this.state.loading == true ? (
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text>Loading ..</Text>
                    </View>

                ) : (

                    <FlatList
                        refreshing={this.state.refresh}
                        onRefresh={this.loadNew}
                        data={this.state.photo_feed}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.la}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item,index }) => (
                        <View style={styles.labseniItem}>
                              <Image
                                    source={
                                       item.authorAvatar
                                     ? { uri: item.authorAvatar }
                                  : require("../assets/tempAvatar.jpg")
                                                             }
                                    style={styles.avatar}
                                />
                        <View style={{ flex: 1 }}>
                         <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                         <View>
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile',{userId: item.authorId })}   >
                         <Text style={styles.name}>{item.authorUsername}</Text>
                         </TouchableOpacity>
                          <Text style={styles.timestamp}>{item.posted}</Text>
                          </View>
                           <Ionicons name="ios-more" size={24} color="#73788B"/>
                           </View>
                           <Text style={styles.post}>{item.caption}</Text>
                           <Image source={{uri:item.url}} style={styles.postImage} resizeMode="cover"/>
                           <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Message',{photoId: item.id })}   >

                             <Ionicons name="ios-chatboxes" size={35} color="#73788B"/>
                           </TouchableOpacity>
                             </View>
                             </View>
                              </View>

                    )}

                    />
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

export default PhotoList;