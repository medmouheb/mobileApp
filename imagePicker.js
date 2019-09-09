import React from 'react';
import { View, Image, Button, Dimensions, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class PickerImage extends React.Component {
  state = {
    avatarSource: null,
  }
  selectImage = async () => {
    ImagePicker.showImagePicker({ noData: true, mediaType: "photo" }, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: response.uri,
        });
      }
    });
  }
  render() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
    return (
      <View style={{ paddingTop: 50 }} >
        {
          this.state.avatarSource && <Image source={{ uri: this.state.avatarSource }} style={{ width: '80%', height: 200, resizeMode: 'contain' }} />}

        <Button title='Select Image' onPress={this.selectImage} />
        <Text style={{ textAlign: "center", fontSize: screenWidth * 0.1, color: "#336699" }} >
          {" "}
        </Text>

        <Button
          onPress={() => this.props.goToScreen("game")}
          title=" envoyer les données et revenir au jeu"
          accessibilityLabel="CONNEXION"
          style={{ margin: screenWidth * 0.13, borderRadius: 50 }}
        />
      </View>
    );
  }
}