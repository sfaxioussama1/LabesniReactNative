// import React from "react";
// import { View, Text, StyleSheet, Button, Image } from "react-native";
// import Fire from "../Fire";
//
// export default class ProfileScreen extends React.Component {
//     state = {
//         user: {}
//     };
//
//     unsubscribe = null;
//
//     componentDidMount() {
//         const user = this.props.uid || Fire.shared.uid;
//
//         this.unsubscribe = Fire.shared.firestore
//             .collection("users")
//             .doc(user)
//             .onSnapshot(doc => {
//                 this.setState({ user: doc.data() });
//             });
//     }
//
//     componentWillUnmount() {
//         this.unsubscribe();
//     }
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={{ marginTop: 64, alignItems: "center" }}>
//                     <View style={styles.avatarContainer}>
//                         <Image
//                             source={
//                                 this.state.user.avatar
//                                     ? { uri: this.state.user.avatar }
//                                     : require("../assets/tempAvatar.jpg")
//                             }
//                             style={styles.avatar}
//                         />
//                     </View>
//                     <Text style={styles.name}>{this.state.user.name}</Text>
//                 </View>
//                 <View style={styles.statsContainer}>
//                     <View style={styles.stat}>
//                         <Text style={styles.statAmount}>21</Text>
//                         <Text style={styles.statTitle}>Posts</Text>
//                     </View>
//                     <View style={styles.stat}>
//                         <Text style={styles.statAmount}>981</Text>
//                         <Text style={styles.statTitle}>Followers</Text>
//                     </View>
//                     <View style={styles.stat}>
//                         <Text style={styles.statAmount}>63</Text>
//                         <Text style={styles.statTitle}>Following</Text>
//                     </View>
//                 </View>
//
//                 <Button
//                     onPress={() => {
//                         Fire.shared.signOut();
//                     }}
//                     title="Log out"
//                 />
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     profile: {
//         marginTop: 64,
//         alignItems: "center"
//     },
//     avatarContainer: {
//         shadowColor: "#151734",
//         shadowRadius: 30,
//         shadowOpacity: 0.4
//     },
//     avatar: {
//         width: 136,
//         height: 136,
//         borderRadius: 68
//     },
//     name: {
//         marginTop: 24,
//         fontSize: 16,
//         fontWeight: "600"
//     },
//     statsContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         margin: 32
//     },
//     stat: {
//         alignItems: "center",
//         flex: 1
//     },
//     statAmount: {
//         color: "#4F566D",
//         fontSize: 18,
//         fontWeight: "300"
//     },
//     statTitle: {
//         color: "#C3C5CD",
//         fontSize: 12,
//         fontWeight: "500",
//         marginTop: 4
//     }
// });


import React from "react";
import {Ionicons} from "@expo/vector-icons";
import {TextInput, View, Text, StyleSheet, Button, Image, FlatList, TouchableOpacity} from "react-native";
import {f, auth, database, storage} from "../config/config.js"
import PhotoList from '../components/photoList.js'


export default class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }

    }

    fetchUserInfo = (userId) => {
        var that = this;
        database.ref('users').child(userId).once('value').then(function (snapshot) {
            const exists = (snapshot.val() !== null);
            if (exists) data = snapshot.val();
            that.setState({
                username: data.username,
                name: data.name,
                avatar: data.avatar,
                loaded: true,
                userId: userId


            })
        });

    };

    checkParams = () => {
        var params = this.props.navigation.state.params;
        if (params) {
            if (params.userId) {
                this.setState({
                    userId: params.userId
                });
                this.fetchUserInfo(params.userId);
            }
        }


    };


    componentDidMount = ()=> {
        this.checkParams();
        var that = this;
        f.auth().onAuthStateChanged(function (user) {

            if (user) {
                that.fetchUserInfo(user.uid);

                // userId:user.uid;
            }

        })
    };

    saveProfile = () =>{
        var name = this.state.name;
        var username = this.state.username;

        if(name!== ''){
            database.ref('users').child(this.state.userId).child('name').set(name);

        }
        if(username!== ''){
            database.ref('users').child(this.state.userId).child('username').set(username);

        }

        this.setState({editingProfile: false});

    };

    logoutUser = () => {
        f.auth().signOut();
        alert('Logged Out')
    };

    editProfil = () => {
        this.setState({editingProfile: true})

    };

    render() {
        return (

            <View style={styles.container}>
                {this.state.loaded == false ? (
                    <View>
                        <Text>Loading ....</Text>
                    </View>

                ) : (
                    <React.Fragment>
                        <View style={{ marginTop: 64, alignItems: "center" }}>
                            <View style={styles.avatarContainer}>

                                <Image
                                    source={
                                       this.state.avatar
                                     ? { uri: this.state.avatar }
                                  : require("../assets/tempAvatar.jpg")
                                                             }
                                    style={styles.avatar}
                                />
                            </View>
                            <Text style={styles.name}>{this.state.name}</Text>
                            <Text style={styles.name}>{this.state.username}</Text>

                        </View>
                        {this.state.editingProfile == true ? (
                            <View
                                style={{alignItems:'center',justifyContent:'center',paddingBottom : 20 , borderBottomWidth:2}}>
                                <TouchableOpacity onPress={() => this.setState({editingProfile: false})}>
                                    <Text style={{fontWeight:'bold'}}>Cancel Editing</Text>
                                </TouchableOpacity>
                                <Text>Name:</Text>
                                <TextInput
                                    editable={true}
                                    placeholder={'Enter your name'}
                                    onChangeText={(text) => this.setState({name:text})}
                                    value={this.state.name}
                                    style={{width:250, marginVertical:10, padding:5, borderColor:'grey', borderWidth:1 }}
                                />

                                <Text>Username:</Text>
                                <TextInput
                                    editable={true}
                                    placeholder={'Enter your username'}
                                    onChangeText={(text) => this.setState({username:text})}
                                    value={this.state.username}
                                    style={{width:250, marginVertical:10, padding:5, borderColor:'grey', borderWidth:1 }}
                                />

                                <TouchableOpacity style={{backgroundColor:'blue', padding:10}}
                                    onPress={() => this.saveProfile()}>
                                    <Text style={{color:'white', fontWeight:'bold'}}>Save Changes</Text>
                                </TouchableOpacity>
                           
                            </View>
                        ) : (
                            <View style={{paddingBottom : 20 , borderBottomWidth:2}}>
                                <TouchableOpacity
                                    onPress={() =>this.logoutUser()}
                                    style={{marginTop:10,marginHorizontal:40, paddingVertical:15,borderRadius:20, borderColor: 'grey', borderWidth:1.5}}>
                                    <Text style={{textAlign:'center', color:'grey'}}>Logout</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() =>this.editProfil()}
                                    style={{marginTop:10,marginHorizontal:40, paddingVertical:15,borderRadius:20,borderColor: 'grey', borderWidth:1.5}}>
                                    <Text style={{textAlign:'center', color:'grey'}}>Edit Profil</Text>
                                </TouchableOpacity>

                            </View>



                        )}
                        <PhotoList isUser={true} userId={this.state.userId} navigation={this.props.navigation}/>

                    </React.Fragment>)}

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profile: {
        marginTop: 64,
        alignItems: "center"
    },
    avatarContainer: {
        shadowColor: "#151734",
        shadowRadius: 30,
        shadowOpacity: 0.4
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    name: {
        marginTop: 24,
        fontSize: 16,
        fontWeight: "600"
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 32
    },
    stat: {
        alignItems: "center",
        flex: 1
    },
    statAmount: {
        color: "#4F566D",
        fontSize: 18,
        fontWeight: "300"
    },
    statTitle: {
        color: "#C3C5CD",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 4
    },
    b1: {
        marginTop: 15
    }
});