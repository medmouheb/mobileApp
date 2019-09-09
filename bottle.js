import React, { Component } from 'react';
import { StyleSheet, Text, View, PanResponder, Platform, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidUpdate() {
    if (this.props.doTanslate) {
      let animationValue = 50 * this.props.translationStep
      console.log("animationValue", animationValue)
      Animated.timing(                  // Animate over time
        this.state.fadeAnim,            // The animated value to drive
        {
          toValue: animationValue,                   // Animate to opacity: 1 (opaque)
          duration: 500,              // Make it take a while
        }
      ).start();                        // Starts the animation
    }
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          top: (this.props.doTanslate ? fadeAnim : 0),
          position: "relative",
          // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default class Bottle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {
        width: 50,
        height: 55,

      }

    }
  }
  pickPhoto = (color) => {
    const screenWidth = Math.round((Dimensions.get('window').width) / 6);
    const screenHeight = Math.round((Dimensions.get('window').height) / 9);
    switch (color) {
      case "red":
        return (
          <Image source={require("./assets/0.png")} style={{ width: screenWidth * 0.7, height: screenHeight * 0.6, margin: screenWidth * 0.05, borderRadius: 5 }} />
        )
        break;
      case "blue":
        return (
          <Image source={require("./assets/1.png")} style={{ width: screenWidth * 0.7, height: screenHeight * 0.6, margin: screenWidth * 0.05, borderRadius: 5 }} />
        )
      case "green":
        return (
          <Image source={require("./assets/2.png")} style={{ width: screenWidth * 0.7, height: screenHeight * 0.6, margin: screenWidth * 0.05, borderRadius: 5 }} />
        )
      case "yellow":
        return (
          <Image source={require("./assets/3.png")} style={{ width: screenWidth * 0.7, height: screenHeight * 0.6, margin: screenWidth * 0.05, borderRadius: 5 }} />
        )
      case "boom":
        return (
          <Image source={require("./assets/boom.png")} style={{ width: screenWidth * 0.7, height: screenHeight * 0.6, margin: screenWidth * 0.05, borderRadius: 5 }} />
        )
      case "transparent":
        return (
          <Image source={null} style={{ width: screenWidth * 0.7, height: screenHeight * 0.6, margin: screenWidth * 0.05, borderRadius: 5 }} />
        )
      default:
          return (
            <Image source={require("./assets/3.png")} style={{ width: screenWidth * 0.7, height: screenHeight * 0.6, margin: screenWidth * 0.05, borderRadius: 5 }} />
          )


    }
  }
  render() {
    const screenWidth = Math.round((Dimensions.get('window').width) / 6);
    const screenHeight = Math.round((Dimensions.get('window').height) / 9);
    return (
      //411 and 775 
      <FadeInView doTanslate={this.props.doTanslate} translationStep={this.props.translationStep}>
        <TouchableOpacity onPress={() => { this.props.bottleClicked(this.props.index) }}>
          {this.pickPhoto(this.props.color)}
        </TouchableOpacity>
      </FadeInView>

    );
  }
}
