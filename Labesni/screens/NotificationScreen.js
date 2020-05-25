import React from "react";
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Image, StatusBar} from "react-native";
import {f, auth, database, storage} from "../config/config.js"

export default class NotificationScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };
    constructor(props) {
        super(props);
        this.state = {
           // name: "",
            num:"",
            rec: "",
            moveScreen: false,
            errorMessage: null,
    
        };
    }

    addreclamation = async() => {
       // var name = this.state.name;  
        var num = this.state.num;  
        var rec = this.state.rec;  
         var userId = f.auth().currentUser.uid;
        if (num != '' && rec != '') {
             try {
                var uObj = {

                    num: num,
                    rec: rec};
                    database.ref('/reclamations/'+userId).set(uObj); 
                    alert("reclamation bien envoyer")


               } 
            catch (error) {
                console.log(error);
                alert(error);
            }
        }else{
             alert('email or numero or reclamation is empty');  
		}

    }
    render() {
        return (
            <View style={styles.container}>
 

                <Image
                    source={require("../assets/authFooter.png")}
                    style={{ position: "absolute", bottom: -105, right: -225}}
                ></Image>

                <Text style={styles.greeting}>{`Saisir ICI Votre Reclamation`}</Text>
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View >
                        <Text style={styles.inputTitle}>Saisir ICI Votre Numero telephone</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({ num:text })} value={this.state.num}
                            value={this.state.num}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Saisir Votre Reclamtion</Text>
                        <TextInput
                            style={{ marginVertical:10, height:100, padding: 5, borderColor: 'grey', borderWidth:1,borderRadius:3,backgroundColor:'white', color:'black'}}
                            onChangeText={(text) => this.setState({ rec:text })} value={this.state.rec}
                            value={this.state.rec}
                        ></TextInput>
                    </View>




    
             
                </View>

                <TouchableOpacity style={styles.button} onPress={this.addreclamation}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Envoyer</Text>
                </TouchableOpacity>


            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1


    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessageee: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    form: {
        marginTop: 30,
        marginBottom: 38,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },

    avatarPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 48,
        justifyContent: "center",
        alignItems: "center"
    },

    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50
    }


});