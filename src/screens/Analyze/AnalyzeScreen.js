import React from 'react';
import {Text, View, StyleSheet, FlatList, Image, ImageBackground } from 'react-native';
import Button from 'react-native-button';
import styles from './AnalyzeScreen.style.js';
import firebase from 'react-native-firebase';

export default class AnalyzeScreen extends React.Component {
  params = this.props.navigation.state.params;
  
  getPercent = () => (this.params.rightAnswerNr/this.params.roundNr)*100;
  getDiagnose = () => {
    percent = this.params.rightAnswerNr > 0 ? this.getPercent() : 0;
    if(percent > 50){


      return 'Genius';
    } else {
      return 'Weak';
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(!user) return;
      this.updatePoint(user);
    });
  }

  updatePoint = (user) => {
    let userDoc = firebase.firestore().collection('users').doc(user.uid);
    const self = this;
    return userDoc.get().then(function(doc) {
      if (doc.exists) {
          let { point, level } = doc.data().gameStats;
          point = (point || 0) + self.params.point;
          point = point > 0 ? point : 0;
          level = level || 1;
          if(self.params.rightAnswerNr > 0 && self.getPercent() > 49) {
           level++;
          }
          const gameStats = { ...user.gameStats, point, level };
          userDoc.set({ gameStats }, { merge: true });
      } else {
          console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  render() {
    return (
      <ImageBackground style={styles.bgImg} source={require('../../assets/space_bg_dark.jpg')}>
        <View style={styles.container}>
          <Text style={styles.title}>
          <Text style={{ color: '#fff'}}>You are</Text>
          </Text>
          <Text style={styles.title}>
           {this.getDiagnose()}
          </Text>
          <Text style={styles.title}>
            <Text style={{ color: '#f2a705'}}>{this.params.roundNr}/{this.params.rightAnswerNr}</Text>
          </Text>

          <Image style={styles.heroImg} resizeMode="contain" source={require('../../assets/maki_head.png')} />
          <Button
            containerStyle={styles.playBtn} 
            style={styles.playBtnInside}             
            onPress={() => this.props.navigation.navigate('Game',{gameType: 'Varify'})}>
            Press to Play
          </Button>
        </View>
      </ImageBackground>
    );
  }
}