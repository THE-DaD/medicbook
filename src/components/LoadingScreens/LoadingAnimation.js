import React from 'react';

import LottieView from 'lottie-react-native';

import {StyleSheet, Text} from 'react-native';

//Resources
import animation from '../../res/animations/loadingAnimation.json'


export default class LoadingAnimation extends React.Component {

  render() {
    return (
        <LottieView
        style={styles.lottieLoading}
        source={animation}
        autoPlay
        />
    );
  }
}

const styles = StyleSheet.create({
    lottieLoading:{
        width: 20,
        height: 20,
    }
});
