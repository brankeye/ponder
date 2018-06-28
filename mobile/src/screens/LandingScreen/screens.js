import React from 'react';
import { Button } from 'react-native';
import { Mutation } from 'react-apollo';
import { Screen, Typography } from '@@components';
import { userSignInAnonMutation, userSignInSocialMutation } from '@@graphql';
import Expo from 'expo';

const enhance = compose(graphql);

class LandingScreen extends React.Component {
  handleAnonymousSignIn = async signIn => {
    const user = await signIn({
      variables: { input: { clientId: Expo.Constants.deviceId } },
    });
    console.log('User: ', user);
    this.props.navigation.navigate('Home');
  };

  handleFacebook = () => {};

  render() {
    return (
      <Screen>
        <Typography type={'title'}>Ponder</Typography>
        <Button title={'Sign in with Facebook'} onPress={this.handleFacebook} />
        <Typography type={'title'}>... or ...</Typography>
        <GuestButton
          title={'Continue as guest'}
          onPress={this.handleAnonymousSignIn}
        />
      </Screen>
    );
  }
}

const GuestButton = ({ onPress, ...props }) => (
  <Mutation mutation={userSignInAnonMutation}>
    {signInAnon => <Button onPress={() => onPress(signInAnon)} {...props} />}
  </Mutation>
);

export { LandingScreen };
