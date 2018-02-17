import React from 'react';
import {Text, View, Image, StyleSheet, FlatList, ImageBackground } from 'react-native';
import Button from 'react-native-button';
import styles from './Varify.style.js';
import Hero from '../Hero.js';
import TopMenu from '../../components/TopMenu/TopMenu';
import firebase from 'react-native-firebase';

const MAX_ROUND_NR = 2;

const variables = {
  hamburger:  require('../../assets/hamburger.png'), 
  pizza: require('../../assets/pizza.png'),
};

export default class Varify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: { rows: [], results: [] },
      games: [],
      currentGame: 0,
      point: 0,
      globalPoint: 0,
      level: 1,
      animate: false,
      roundNr: 1,
      rightAnswerNr: 0,
    };

    this.getGame();
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(!user && !user.uid) return;
      let userDoc = firebase.firestore().collection('users').doc(user.uid);
      const self = this;
      userDoc.get().then(function(doc) {
        if (doc.exists) {
            const { level, point } = doc.data().gameStats;
            self.setState({ globalPoint: point || 0 , level });
        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    });
  }

  changePoint = (n) => {
    let point = this.state.point + n;
    if(this.state.roundNr === MAX_ROUND_NR) {
      const { roundNr,  rightAnswerNr } = this.state;
      const params = { roundNr, rightAnswerNr, point };
      return this.props.navigation.navigate('Analyze', {...params});
    }
    this.setState({ point });
    this.nextGame();
  }

  checkAnswer = (answer) => {
    const isRight = answer === this.state.game.answer;
    const rightAnswerNr = isRight ? this.state.rightAnswerNr + 1 : this.state.rightAnswerNr;
    if(isRight) {
      this.setState({animate:'animateEyeSize', rightAnswerNr },() => this.changePoint(5));
    } else {
       this.setState({animate:'animateDeadEye', rightAnswerNr },() => this.changePoint(-2));
    }
  }

  nextGame = () => {
    const roundNr = this.state.roundNr + 1;
    this.setState({ roundNr });
    const currentGame = this.state.currentGame + 1;
    if(this.state.games[currentGame]) {
      const game = {...this.state.games[currentGame].game};
      this.setState({ game, currentGame });
    } else {
      this.setState({ currentGame: 0 });
      this.getGame();
    }
  }

  getMultiplierImage(n,v) {
    const rows = [];
    for (var i=0; i < n; i++) {
        rows.push(<Image style={styles.variable}  source={variables[v]} />);
    }
    return rows;
  }

  shareGame() {
    console.log('pina');
    const self = this;
    let params = { rows: [...this.state.game.rows], result: [...this.state.game.results] };
    params = JSON.stringify(params);
    const url = `http://geniusgames.webmusketas.hu/api/create/image?params=${params}`;
    console.log(url);
    return fetch(url)
    .then((response) => response.json())
    .then(data => (console.log(data)));

  }

  getGame() {
    const self = this;
    return fetch('http://geniusgames.webmusketas.hu/api/thegame/12', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then(data => self.setState({
        games:data.games,
        game: data.games[0].game,
      })
    );
  }

  render() {
      return (
        <ImageBackground style={styles.backgroundImage}  source={require('../../assets/space_bg_dark.jpg')} >
        <View style={styles.itemContainer}>
            <TopMenu point={this.state.point + this.state.globalPoint} roundNr={this.state.roundNr} rightAnswerNr={this.state.rightAnswerNr} />
            <View style={styles.maki}>
              <Hero height={100} animate={this.state.animate} />
            </View>
            <Button
                containerStyle={styles.answerBtn}
                style={styles.answerBtnText}
                onPress={() => this.shareGame()}>
                Share
              </Button>
            <Text style={styles.title}>
              Do <Text style={styles.fontYellow}>You</Text> know the <Text style={styles.fontRed}>answer?</Text>
            </Text>
            <View>      
                <FlatList
                  data={this.state.game.rows}
                  contentContainerStyle={styles.equationList}
                  renderItem={({item}) =>
                  <View style={styles.itemWrapper} key={item.result}>
                      <View style={styles.equationItem}>
                          <View style={styles.multiplierImage}>
                            {this.getMultiplierImage(item.multiplier_1, 'hamburger')}
                          </View>
                          
                          <Text style={styles.operator}>
                            {item.operator == true ? "+": "-"}
                          </Text>
                          
                          <View style={styles.multiplierImage}>
                            {this.getMultiplierImage(item.multiplier_2,'pizza')}
                          </View>
                          
                          <Text style={styles.resultWrapper}>
                            = <Text style={styles.result}>{`${item.result}`}</Text>
                          </Text>
                      </View>
                  </View>}
                />

                <View style={ styles.answerListWrapper }>
                  <FlatList
                    contentContainerStyle={styles.answerList}
                    data={this.state.game.results}
                    renderItem={({item}) =>
                     <View style={styles.playBtn} key={item}>
                        <Button
                          containerStyle={styles.answerBtn}
                          style={styles.answerBtnText}
                          onPress={() => this.checkAnswer(item)}>
                          {`${item}`}
                        </Button>
                      </View>}
                    />
                </View>
            </View>
        </View>
        </ImageBackground>
      );
  }
}