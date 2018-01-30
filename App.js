import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/screens/Home/HomeScreen';
import GameScreen from './src/screens/Game/GameScreen';
import AnalyzeScreen from './src/screens/Analyze/AnalyzeScreen';

const GreniusGames = StackNavigator({
    Home: { screen: HomeScreen },
    Game: { screen: GameScreen },
    Analyze: { screen: AnalyzeScreen },
}, {
    headerMode: 'none',
    navigationOptions: { headerMode:'none' }
});

export default class App extends React.Component {
  render() {
    return <GreniusGames />;
  }
}
