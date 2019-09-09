import React, { Component } from 'react';
import { StyleSheet, Text, View, PanResponder, Platform, Image, ImageBackground } from 'react-native';
import PickerImage from './imagePicker.js'
import IntroScreen from './IntroScreen'
import ConnexionClient from './ConnexionClient'
import GameBoard from './GameBoard'
import Ad from './Ad'
import GameBoardHeader from './GameBoardHeader'



const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    flexWrap: "wrap",
    position: "relative",
    justifyContent: 'center',
    alignSelf:"center",

    //flexDirection: "row",
    opacity: 1,

  },
  container: {
    flex: 1,
    flexWrap: "wrap",
    marginTop: 50,
    margin:"auto",
    justifyContent: 'center',


    //flexDirection: "row",
    // paddingTop: 50,
    // paddingLeft: 40,
    opacity: 0.95,

  },

});
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //intro,game,ad,ConnexionClient,youWonAGift
      screen: "intro",
      score: 0,
    }
  }

  goToScreen = (screenName) => {
    this.setState({ ...this.state, screen: screenName })
  }
  updateScore = (boomingResult) => {
    this.setState({ score: (this.state.score + boomingResult) })
  }
  render() {
    switch (this.state.screen) {
      case "intro":
        return (
          <IntroScreen goToScreen={this.goToScreen} />
        )
      case "game":
        return (
          <ImageBackground source={require('./assets/sky-back-ground.jpg')} style={styles.bigContainer} >
            <GameBoardHeader goToScreen={this.goToScreen} score={this.state.score} />

            <ImageBackground style={styles.container} >
              <GameBoard updateScore={this.updateScore} />
            </ImageBackground>
          </ImageBackground>

        );
      case "ad":
        return (
          <Ad goToScreen={this.goToScreen} />
        )
      case "imagePicker":
        return (
          <PickerImage goToScreen={this.goToScreen} />
        )
      case "ConnexionClient":
        return (
          <ConnexionClient goToScreen={this.goToScreen} />
        )
      case "youWonAGift":
        return (
          <ImageBackground source={require('./assets/sky-back-ground.jpg')} style={styles.container} >

          </ImageBackground>
        )
    }

  }
}


