import React, { Component } from 'react';
import { StyleSheet, Text, View, PanResponder, Platform, Image, ImageBackground, Animated, Dimensions, TextInput } from 'react-native';
import VideoAD from "./videoAd.js"

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

export default class Ad extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount = () => {
        setTimeout(() => {
            this.props.goToScreen('ConnexionClient')
        }, 5000)
    }
    render() {
        const screenWidth = Math.round(Dimensions.get('window').width);
        const screenHeight = Math.round(Dimensions.get('window').height);
        return (
                <View >
                    <Text style={{fontSize:42,fontFamily:"italic",textAlign:"center",color:"red"}}>inserer ici votre publicité </Text>
                    <VideoAD style={{ width: screenWidth}} />
                </View>



        )

    }
}