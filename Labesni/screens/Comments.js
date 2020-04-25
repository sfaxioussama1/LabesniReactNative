import React from "react";
import {View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Image, FlatList} from "react-native";
import {f, auth, database, storage} from "../config/config.js"

class Commentss extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            comments_list: []

        }


    }

    checkParams = () => {
        var params = this.props.navigation.state.params;
        if (params) {
            if (params.photoId) {
                this.setState({
                    photoId: params.photoId
                });
                this.fetchComments(params.photoId);
            }
        }


    };

    addCommentToList = (comments_list, data, comment) => {
        var that = this;
        var commentObj = data[comment];
        database.ref('users').child(commentObj.author).once('value').then(function (snapshot) {

            const exists = ((snapshot).val() != null);
            if (exists) data = snapshot.val();
            comments_list.push({
                id: comment,
                comment: commentObj.comment,
                posted: that.timeConverter(commentObj.posted),
                author: data.username,
                authorId: commentObj.author
            });

            that.setState({
                refresh: false,
                loading: false
            });


        }).catch(error => console.log(error));


    };

    fetchComments = (photoId)=> {

        var that = this;

        database.ref('comments').child(photoId).orderByChild('posted').once('value').then(function (snapshot) {
            const exists = (snapshot.val() != null);
            if (exists) {
                data = snapshot.val();
                var comments_list = that.state.comments_list;
                for (var comment in data) {
                    that.addCommentToList(comments_list, data, comment);
                }

            } else {
                that.setState({
                    comments_list: []
                });
            }

        }).catch(error => console.log(error));


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

    componentDidMount = ()=> {
        this.checkParams();
        // var that = this;
        // f.auth().onAuthStateChanged(function (user) {
        //     if (user) {
        //         that.setState({
        //             loggedin: true
        //         });
        //
        //     } else {
        //         that.setState({
        //             loggedin: false
        //         });
        //
        //     }
        //
        // })
    };
    postComment = () =>{
        
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row', height: 50,paddingTop:20, backgroundColor:'white', borderColor:'lightgrey' ,borderBottomWidth:0.2,  alignItems: "center",
        justifyContent: "center"}}>
                    <TouchableOpacity

                        onPress={()=> this.props.navigation.navigate("Home")}>
                        <Text style={{fontSize:20, fontWeight:'bold'}}>Go Back</Text>
                    </TouchableOpacity>

                </View>

                {this.state.comments_list.length == 0 ? (
                    <Text>Non Comments found</Text>

                ) : (
                    <FlatList
                        refreshing={this.state.refresh}
                        data={this.state.comments_list}
                        keyExtractor={(item,index) =>index.toString()}
                        style={{flex:1, backgroundColor:'#eee'}}
                        renderItem={({item, index}) => (
                        <View key={index} style={{width:'100%', overflow:'hidden', marginBottom:5, justifyContent:'space-between', borderBottomWidth:1, borderColor:'grey'}}>

                        <View style={{padding:5,width: '100%',flexDirection:'row', justifyContent: 'space-between'}}>
                               <Text>{item.posted}</Text>
                               <TouchableOpacity
                              onPress={() => this.props.navigation.navigate('Profile',{userId: item.authorId })}   >
                               <Text>{item.author}</Text>

                                </TouchableOpacity>
                             </View>
                             <View style={{padding:5}}>
                             <Text>{item.comment}</Text>
</View>
                        </View>
                        )}
                    />
                )}

                <KeyboardAvoidingView behavior="padding" enabled style={{borderTopWidth:1, borderTopColor:'grey',padding:10,marginBottom:15}}>
                    <Text style={{fontWeight:'bold'}}>POST COMMENT </Text>
                    <View>
                        <TextInput
                        editable={true}
                        placeholder={'entrer votre commandaire'}
                        onChangeText={(text) => this.setState({comment: text})}
                        style={{marginVertical:10,height:50, padding:5, borderColor:'grey', borderRadius:3, backgroundColor:'white'}}
                        />
                        <TouchableOpacity
                        onPress={() =>this.postComment()}>
                            <Text>POST</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});
export default Commentss;