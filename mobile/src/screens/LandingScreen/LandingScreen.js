import React from 'react';
import { Button } from 'react-native';
import { Mutation } from 'react-apollo';
import { Screen, Typography } from '@@components';
import { withAuth } from '@@consumers';
import { userSignInAnonMutation, userSignInSocialMutation } from '@@graphql';
import Expo from 'expo';

class LandingScreen extends React.Component {
  handleAnonymousSignIn = async signIn => {
    const user = await signIn({
      variables: { input: { clientId: Expo.Constants.deviceId } },
    });
    console.log('User: ', user);
    if (user) {
      await this.props.signInAnonymously();
      this.props.navigation.navigate('App');
    }
  };

  handleFacebook = () => {};

  render() {
    return (
      <Screen>
        <Typography type={'title'}>
          Ponder: {Expo.Constants.deviceId}
        </Typography>
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

export default withAuth(LandingScreen);
