import React from 'react';
import {Text, View, Image, Animated } from 'react-native';
import Button from 'react-native-button';
import styles from './TopMenu.style.js';
import GameTimer from '../GameTimer/GameTimer';
import Star from '../Animated/Star';
import firebase from 'react-native-firebase';
import uuidv1 from 'uuid/v1';
import { ShareDialog } from 'react-native-fbsdk';

const shareLink = {
  contentType: 'link',
  contentUrl: "geniusgames.hu",
  contentDescription: 'Wow, check out this great site!',
};

export default class TopMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastPoint: 0,
      lastPointOpacity: new Animated.Value(0),
      user: false,
    };
  }
  
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(!user) return;
      this.setState({ user });
    });
  }

  showLastPoint = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.lastPointOpacity, {
          toValue: 1,
          duration: 750,
        }),
        Animated.timing(this.state.lastPointOpacity, {
          delay: 2500,
          toValue: 0,
          duration: 550,
        })
      ]),
      {
        iterations: 1
      }
    ).start();
  }

  padPoint(n, width, z) {
    z = z || '0';
    n = n > 0 ? n : 0;
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  getPercent = () => (this.props.rightAnswerNr/10)*100;
  drawStars = () => {
    const stars = [];
    for(i = 1;i < 6; i++) {
      const starPercent = i * 15;
      const currentPercent = this.props.rightAnswerNr > 0 ? this.getPercent() : 0;
      stars.push(<Star color="#f2a705" opacity={currentPercent > starPercent ? 1 : 0.4} />);
    }
    return stars.reverse();
  }

  shareGame(game) {
    const self = this;
    const gameData = { userID: this.state.user.uid , game };
    const games = firebase.firestore().collection('games');
    return games.add(gameData).then(function(doc) {
      
      const url = `http://geniusgames.webmusketas.hu/api/create/image/${doc.id}`;
      return fetch(url)
      .then((response) => response.json())
      .then(data => {
        const link = `http://geniusgames.webmusketas.hu/shared/${doc.id}`;
        self.shareLinkWithShareDialog(link);

      }).catch(error => (console.log(error)));
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  shareLinkWithShareDialog = (contentUrl) => {
    const link = { ...shareLink, contentUrl }; 
    return ShareDialog.canShow(link).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(link);
        }
      }
    ).then(
      function(result) {
        if (result.isCancelled) {
          alert('Share cancelled');
        } else {
          alert('Share success with postId: '
            + result.postId);
        }
      },
      function(error) {
        alert('Share fail with error: ' + error);
      }
    );
  }


  render() {
    let { lastPointOpacity } = this.state;
    return (
      <View >
        <View style={styles.mainMenu}>
          <GameTimer interval="120" />
          <Text style={styles.point}>
            {this.padPoint(this.props.point, 5)}
          </Text>
          <Animated.View style={{ opacity: lastPointOpacity }}>
            <Text style={styles.lastPoint}>
              {this.state.lastPoint}
            </Text>
          </Animated.View>
        </View>
        <View style={styles.levelMenu}>
          <View style={styles.linksWrapper}>
            <Button
              containerStyle={styles.shareBtn}
              style={styles.shareBtnText}
              onPress={() => this.shareGame(this.props.game)}>
              <Image style={styles.shareBtnIcon}
              resizeMode="contain" 
              source={require('../../assets/share_icon.png')} />
            </Button>
          </View>

          <View style={styles.starsWrapper} >
            {this.drawStars()}
          </View>
        </View>
      </View>
    );
  }
}