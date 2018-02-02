import React from 'react';
import Varify from '../../games/Varify/Varify';

export default class GameScreen extends React.Component {
  render = () => (<Varify navigation={this.props.navigation} />);
}
