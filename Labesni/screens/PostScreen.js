// // Post Screen
//
// import React from "react";
// import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Image} from "react-native";
// import {Ionicons} from "@expo/vector-icons";
// import Constants from "expo-constants";
// import * as Permissions from "expo-permissions";
// import Fire from "../Fire";
// import * as ImagePicker from "expo-image-picker";
// import UserPermissions from "../utilies/UserPermissions";
//
// const firebase = require("firebase");
// require("firebase/firestore");
//
// export default class PostScreen extends React.Component {
//     state = {
//         text: "",
//         image: null
//     };
//
//     componentDidMount() {
//         UserPermissions.getCameraPermission;
//     }
//
//     // getPhotoPermission = async() => {
//     //     if (Constants.platform.ios) {
//     //         const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//     //
//     //         if (status != "granted") {
//     //             alert("lezemek  permission bech t'accidi lil camera");
//     //
//     //         }
//     //     }
//     // };
//
//     handlePost = () => {
//         Fire.shared
//             .addPost({ text: this.state.text.trim(), localUri: this.state.image })
//             .then(ref => {
//                 this.setState({ text: "", image: null });
//                 this.props.navigation.goBack();
//             })
//             .catch(error => {
//                 alert(error);
//             });
//     };
//
//     pickImage = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [4, 3]
//         });
//
//         if (!result.cancelled) {
//             this.setState({ image: result.uri });
//         }
//     };
//     render() {
//         return (
//             <SafeAreaView style={styles.container}>
//                 <View style={styles.header}>
//                     <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
//                         <Ionicons name="md-arrow-back" size={24} color="#D8D9DB"></Ionicons>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={this.handlePost}>
//                         <Text style={{ fontWeight: "500" }}>Post</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <Image source={require("../assets/tempAvatar.jpg")} style={styles.avatar}></Image>
//                     <TextInput
//                         autoFocus={true}
//                         multiline={true}
//                         numberOfLines={4}
//                         style={{ flex: 1 }}
//                         placeholder="Want to share something?"
//                         onChangeText={text => this.setState({ text })}
//                         value={this.state.text}
//                     ></TextInput>
//                 </View>
//
//                 <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
//                     <Ionicons name="md-camera" size={32} color="#D8D9DB"></Ionicons>
//                 </TouchableOpacity>
//                 <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
//                     <Image source={{ uri: this.state.image }} style={{ width: "100%", height: "100%" }}></Image>
//                 </View>
//             </SafeAreaView>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//
//     },
//     header: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         paddingHorizontal: 32,
//         paddingVertical: 30,
//         borderBottomWidth: 1,
//         borderBottomColor: "#D8D9DB"
//     },
//     inputContainer: {
//         margin: 32,
//         flexDirection: "row"
//     },
//     avatar: {
//         width: 48,
//         height: 48,
//         borderRadius: 24,
//         marginRight: 16
//     },
//     photo: {
//         alignItems: "flex-end",
//         marginHorizontal: 32
//     }
//
// });


import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from "expo-image-picker";
import {f, auth, database, storage} from "../config/config.js";

export default class PostScreen extends React.Component {

    constructor(propos) {
        super(propos);
        this.state = {
            loggedin: false,
            imageId: this.uniqueId()
        }
        // alert(this.uniqueId());

    }

    _checkPermissions = async() => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({camera: status});

        const {statusRoll} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({cameraRoll: statusRoll});


    };

    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);

    };


    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-'
    };

    findNewImage = async()=> {

        this._checkPermissions();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
            allowsEditing: true,
            quality: 1
        });
        console.log(result);

        if (!result.cancelled) {
            console.log('upload image');
            this.uploadImage(result.uri);

        } else {
            console.log('cancel')
        }

    };
    uploadImage = async(uri)=> {
        var that = this;
        var userid = f.auth().currentUser.uid;
        var imageId = this.state.imageId;

        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(uri)[1];
        this.setState({currentFileType: ext});

        const  response = await fetch (uri);
        const blob = await response.blob();

        var FilePath = imageId+'.'+that.state.currentFileType;

        const ref = storage.ref('user/'+userid+'/img').child(FilePath);

        var snapshot = ref.put(blob).on('state_changed', snapshot => {
            console.log('Progress', snapshot.bytesTransferred, snapshot.totalBytes);
        });

    };


    render() {
        return (
            <View style={styles.container}>
                <Text>Upload Your Image</Text>
                <Text></Text>
                <TouchableOpacity onPress={()=> this.findNewImage()}>
                    <Ionicons name="md-camera" size={60} color="#D8D9DB"></Ionicons>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});