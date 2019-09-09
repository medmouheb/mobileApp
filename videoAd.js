import React from 'react';
import Video from 'react-native-video';
import { Text, StyleSheet, View } from 'react-native';


export default class VideoAD extends React.Component {

    render() {
        const sintel = require('./assets/sintel.mp4');

        return (
            <Video resizeMode="contain" source={sintel}   // Can be a URL or a local file.
                // Callback when video cannot be loaded
                style={styles.backgroundVideo} />
        )
    }
}
var styles = StyleSheet.create({
    backgroundVideo: {
        top: 0,
        left: 0,
        width:400,
        height:400,
    },
});