import React, { Component } from 'react';
import { StyleSheet, Text, View, PanResponder, Platform, Image, ImageBackground, Animated, Dimensions } from 'react-native';

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
class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 2000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }
  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
export default class IntroScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentImage: "rameo"
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ currentImage: "baha" })
    }, 2000)
  }
  componentDidUpdate(){
    var d = new Date(2019, 9, 10);
    var a= new Date();
    if(this.state.currentImage==="baha"){
      setTimeout(() => {
        this.setState({ currentImage: "bibine" })
      }, 2000)
    }
    else if(d<a){
      console.log("blocked")
    }
    else{
      setTimeout(() => {
        this.props.goToScreen("game")
      }, 2000)
    }
    
  }

  render() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
    return (
      <View >
        {
          this.state.currentImage==="rameo" &&
          <FadeInView >
            <Image source={require('./assets/logo-romeo.jpg')} style={{ width: screenWidth, height: screenHeight }} />
          </FadeInView>
        }

        {
          this.state.currentImage==="baha" &&
          <FadeInView >
            <Image source={require('./assets/techtunis.png')} style={{ width: screenWidth, height: screenWidth, position: "relative", top: 100 }} />

            <View style={{ backgroundColor: "#ecf2f9", position: "relative",height:60, top: 100,borderWidth: 1,margin:5,borderRadius: 50,}}>
              <Text style={{ textAlign: "center", fontSize: 40, color: "#336699"}} >
                {"Baha Othman\n"}
              </Text>
            </View>

            <Text style={{ textAlign: "center", fontSize: 20, color: "red", position: "relative", top: 130, padding: 10 }} >
              {"bahaeddinebenothmane@gmail.com\n"}
            </Text>

          </FadeInView>
        }
         {
          this.state.currentImage==="bibine" &&
          <FadeInView >
            <Image source={require('./assets/bibine.jpg')} style={{ width: screenWidth, height: screenHeight }} />
          </FadeInView>
        }
      </View>

    )

  }
}