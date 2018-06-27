import React from 'react';
import { AsyncStorage, Button } from 'react-native';
import { Screen, PoemListWithData, Subscriber, Typography } from '@@components';

class LandingScreen extends React.Component {
  handleGuest = () => {};

  handleFacebook = () => {};

  render() {
    return (
      <Screen>
        <Typography type={'title'}>Ponder</Typography>
        <Button title={'Sign in with Facebook'} onPress={this.handleFacebook} />
        <Typography type={'title'}>... or ...</Typography>
        <Button title={'Continue as guest'} onPress={this.handleGuest} />
      </Screen>
    );
  }
}

export { LandingScreen };
