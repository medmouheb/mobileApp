import React, { Component } from 'react';
import { StyleSheet, Text, View, PanResponder, Platform, Image, ImageBackground, Animated, Dimensions, TextInput } from 'react-native';


const styles = StyleSheet.create({
    container: {
        height:50,
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        paddingTop: 5,
        paddingLeft: 5,
        //opacity: 0.75,

    },

});

export default class GameBoardHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeCounter: 60
        }
    }
    componentDidMount = () => {
        this.tick()
    }
    tick = () => {
        if (this.state.timeCounter > 0) {
            setTimeout(() => {
                this.setState({ timeCounter: --this.state.timeCounter })
                this.tick()
            }, 1000);
        }
        else {
            this.props.goToScreen("ad")
        }

    }

    render() {

        return (
            <View style={{height:50}} >
                <Text style={{ fontSize: 25, color: "red", position: "relative", top: 40, width: 100, height: 40, backgroundColor: "black", borderWidth: 1, borderRadius: 30, paddingLeft:30, opacity: 1}}>
                    {this.state.timeCounter}
                </Text>
                <Text style={{ fontSize: 25, color: "yellow", position: "relative", left: 200, width: 150, height: 40, backgroundColor: "black", borderWidth: 1, borderRadius: 30,paddingLeft:30 , opacity: 1,marginRight:10}}>
                    {this.props.score}/60
                </Text>
            </View>

        )

    }
}