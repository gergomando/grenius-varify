import React from 'react';
import {Text, View, StyleSheet, FlatList, Image, ImageBackground } from 'react-native';
import Button from 'react-native-button';
import styles from './HomeScreen.style.js';

import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import Play from '../../components/Icons/PlayBtn';
import Facebook from '../../components/Icons/Facebook';

export default class HomeScreen extends React.Component {
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
          const user = currentUser.toJSON();
          const userDoc = firebase.firestore().collection('users').doc(user.uid);
          userDoc.set(user, { merge: true});
          this.navigateToGame();
        }
      })
      .catch((error) => {
        console.log(`Login fail with error: ${error}`);
      })
  }

  addUser = () => {
    const data = { name: 'Tarka Barka' };
    const setDoc = firebase.firestore().collection('users').doc().set(data);
    this.navigateToGame();
  }

  navigateToGame = () => {
    return this.props.navigation.navigate('Game');
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
            onPress={this.navigateToGame}>
            Press to Play
            <View style={{position: 'absolute', 'right': 24, }}>
            <Play />
            </View>
          </Button>
          <Button
            containerStyle={[styles.playBtn, styles.playBtnFb]} 
            style={[styles.playBtnInside, styles.playBtnInsideFb]}
            onPress={this.facebookLogin}>
            Login with Fb 
            <View style={{position: 'absolute', 'right': 24, }}>
            <Facebook />
            </View>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}