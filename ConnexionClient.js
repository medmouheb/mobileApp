import React, { Component } from 'react';
import { StyleSheet, Text, View, PanResponder, Platform, Image, ImageBackground, Button, Dimensions, TextInput } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: "wrap",
        //flexDirection: "row",
        paddingTop: 100,
        paddingLeft: 40,
        //opacity: 0.75,

    },

});

export default class ConnexionClient extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        const screenWidth = Math.round(Dimensions.get('window').width);
        const screenHeight = Math.round(Dimensions.get('window').height);
        return (
            <View style={{ width: screenWidth * 0.75,height:screenHeight * 0.7, position: "relative", top: screenHeight*0.005, backgroundColor: "#ecf2f9", borderWidth: 1, margin: screenWidth*0.13, borderRadius: 50,padding:5 }}>
                <Text style={{ textAlign: "center", fontSize: screenWidth *0.05, color: "#336699" }} >
                    {"Remplir cette Formulaire pour gagner un cadeau"}
                </Text>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,

                    }}
                />
                <Text style={{ textAlign: "center", fontSize: screenWidth *0.1, color: "#336699" }} >
                    {"Votre nom"}
                </Text>
                <TextInput
                    style={{ height: screenWidth *0.1, margin: screenWidth *0.05, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />
                <Text style={{ textAlign: "center", fontSize: screenWidth *0.1, color: "#336699" }} >
                    {"Votre e-mail"}
                </Text>
                <TextInput
                    style={{ height: screenWidth *0.1, margin: screenWidth *0.05, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(mdp) => this.setState({ mdp })}
                    value={this.state.mdp}
                />
                <Button
                    title="Passer à la page d'upload de la photo"
                    accessibilityLabel="CONNEXION"
                    onPress={()=>this.props.goToScreen("imagePicker")}
                    style={{margin:screenWidth *0.2,borderRadius: 50}}
                />

            </View>
        )

    }
}