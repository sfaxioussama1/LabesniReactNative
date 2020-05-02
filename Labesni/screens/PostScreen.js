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
        if (this.state.uploading == false) {
            if (this.state.caption != '') {
                this.uploadImage(this.state.uri);

            } else {
                alert('brabi da5el text');
            }
        } else {
            console.log('ignore button')
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
                progress: progress,

            });
        }, function (error) {
            console.log('error with upload - ' + error);
        }, function () {
            that.setState({progress: 100});
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log(downloadURL);
                that.procesUpload(downloadURL);
            });

        });


        // var snapshot = ref.put(blob).on('state_changed', snapshot => {
        // console.log('Progress', snapshot.bytesTransferred, snapshot.totalBytes);
//     }
// )
//     ;


    };

    procesUpload = (imageUrl) => {
        var imageId = this.state.imageId;
        var userId = f.auth().currentUser.uid;

        var caption = this.state.caption;

        var dateTime = Date.now();
        var timestamp = Math.floor(dateTime / 1000);


        var photoObj = {
            author: userId,
            caption: caption,
            posted: timestamp,
            url: imageUrl


        };

        database.ref('/photos/' + imageId).set(photoObj);
        database.ref('/users/'+userId+'/photos/' + imageId).set(photoObj);
        alert('Image Uploaded !!!');

        this.setState({
            uploading: false,
            imageSelected : false,
            caption: '',
            uri:''



        });


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
                            />
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