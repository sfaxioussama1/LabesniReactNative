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
import {TextInput, ActivityIndicator, View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from "expo-image-picker";
import {f, auth, database, storage} from "../config/config.js";

export default class PostScreen extends React.Component {

    constructor(propos) {
        super(propos);
        this.state = {
            loggedin: false,
            imageId: this.uniqueId(),
            imageSelected: false,
            uploading: false,
            caption: '',
            progress: 0

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
            // this.uploadImage(result.uri);
            this.setState({
                imageSelected: true,
                imageId: this.uniqueId(),
                uri: result.uri
            })

        } else {
            console.log('cancel');
            this.setState({
                imageSelected: false
            })

        }

    };

    uploadPublish = () => {
        if (his.state.caption != '') {
            this.uploadImage(this.state.uri);

        } else {
            alert('brabi da5el text');
        }

    };

    uploadImage = async(uri)=> {
        var that = this;
        var userid = f.auth().currentUser.uid;
        var imageId = this.state.imageId;

        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(uri)[1];
        this.setState({
            currentFileType: ext,
            uploading: true
        });

        const response = await fetch(uri);
        const blob = await response.blob();

        var FilePath = imageId + '.' + that.state.currentFileType;

        var uploadTask = storage.ref('user/' + userid + '/img').child(FilePath).put(blob);
        uploadTask.on('state_changed', function (snapshot) {
            var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
            console.log('Upload Is ' + progress + '% complete');
            that.setState({
                progress:progress,

            });
        }, function (error) {
            console.log('error with upload - '+error);
        }, function () {
this.setState({progress:100});
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
            
                alert(downloadURL);
            });

        });


        // var snapshot = ref.put(blob).on('state_changed', snapshot => {
        // console.log('Progress', snapshot.bytesTransferred, snapshot.totalBytes);
//     }
// )
//     ;

    };


    render() {
        return (
            <View style={{flex:1}}>
                {this.state.imageSelected == true ? (
                    <View style={{flex:1}}>

                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Upload</Text>

                        </View>
                        <View style={{padding:5}}>
                            <Text style={{marginTop : 5}}>Text:</Text>
                            <TextInput
                                editable={true}
                                autoFocus={true}
                                multiline={true}
                                numberOfLines={4}
                                style={{ marginVertical:10, height:100, padding: 5, borderColor: 'grey', borderWidth:1,borderRadius:3,backgroundColor:'white', color:'black'}}
                                placeholder="Want to share something?"
                                onChangeText={text => this.setState({ caption:text })}
                                value={this.state.text}
                            ></TextInput>
                            <TouchableOpacity onPress={()=> this.uploadPublish()}
                                              style={{alignSelf:'center', width:170,marginHorizontal:'auto', backgroundColor:'purple', borderRadius:5, paddingVertical:10, paddingHorizontal:20}}>
                                <Text style={{textAlign:'center', color:'white'}}>Upload & Publish</Text>
                            </TouchableOpacity>

                            { this.state.uploading == true ? (
                                <View style={{marginTop:10}}>
                                    <Text>{this.state.progress} %</Text>
                                    {this.state.progress != 100 ? (
                                        <ActivityIndicator size="small" color="blue"></ActivityIndicator>
                                    ) : (
                                        <Text>Processing</Text>
                                    )}
                                </View>

                            ) : (
                                <View></View>
                            )}

                            <Image source={{uri : this.state.uri}}
                                   style={{marginTop:10,resizeMode:'cover', width:'100%',height:275}}/>


                        </View>

                    </View>

                ) : (


                    <View style={styles.container}>
                        <Text>Upload Your Image</Text>
                        <Text></Text>
                        <TouchableOpacity onPress={()=> this.findNewImage()}>
                            <Ionicons name="md-camera" size={60} color="#D8D9DB"></Ionicons>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
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
    }
});