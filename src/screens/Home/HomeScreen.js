import React from 'react';
import {Text, View, StyleSheet, FlatList, Image, ImageBackground } from 'react-native';
import Button from 'react-native-button';
import styles from './HomeScreen.style.js';

import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser : {
        displayName: 'anonymus',
      }
    };
  }

  facebookLogin = () => {
    return LoginManager
      .logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (!result.isCancelled) {
          return AccessToken.getCurrentAccessToken();
        }
      })
      .then(data => {
        if (data) {
          // create a new firebase credential with the token
          const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
          // login with credential
          return firebase.auth().signInWithCredential(credential);
        }
      })
      .then((currentUser) => {
        if (currentUser) {
          this.setState({ 'currentUser' : currentUser.toJSON() });
          this.props.navigation.navigate('Game',{gameType: 'Varify', user: this.state.currentUser })
        }
      })
      .catch((error) => {
        console.log(`Login fail with error: ${error}`);
      })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground style={styles.backgroundImage}  
        source={require('../../assets/space_bg_dark.jpg')} 
      >
        <View style={styles.container}>
        <Text style={styles.title}>
          <Text style={{ color: '#fff'}}>The</Text> Game
        </Text>
          <Image style={styles.heroImg} resizeMode="contain" source={require('../../assets/maki_head.png')} />
          <Button
            containerStyle={styles.playBtn} 
            style={styles.playBtnInside}
            onPress={() => navigate('Game',{gameType: 'Varify', user: this.state.currentUser })}>
            Press to Play
          </Button>
          <Button
            containerStyle={styles.playBtn} 
            style={styles.playBtnInside}
            onPress={this.facebookLogin}>
            Login Fb
          </Button>

        </View>
      </ImageBackground>
    );
  }
}