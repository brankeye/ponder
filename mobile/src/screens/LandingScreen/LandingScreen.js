import React from 'react';
import { Button } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Screen, Typography } from '@@components';
import { withAuth } from '@@consumers';
import Expo from 'expo';

class LandingScreen extends React.Component {
  componentDidMount() {
    console.log('Client Id: ', Expo.Constants.deviceId);
  }

  handleAnonymousSignIn = async signIn => {
    const { status: existingStatus } = await Expo.Permissions.getAsync(
      Expo.Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Expo.Permissions.askAsync(
        Expo.Permissions.NOTIFICATIONS
      );
      finalStatus = status;
    }

    const notify = finalStatus === 'granted';

    // Get the token that uniquely identifies this device
    let pushToken = notify
      ? await Expo.Notifications.getExpoPushTokenAsync()
      : null;

    const timeZone = await Expo.DangerZone.Localization.getCurrentTimeZoneAsync();
    const user = await signIn({
      variables: {
        input: {
          clientId: Expo.Constants.deviceId,
          settings: {
            pushToken,
            timeZone,
            notify,
            notifyTime: notify ? '12:00' : null,
            theme: 'Dark',
          },
        },
      },
    });
    console.log('User: ', user);
    if (user) {
      await this.props.auth.signInAnonymously();
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
  <Mutation mutation={UserAnonMutation}>
    {signInAnon => <Button onPress={() => onPress(signInAnon)} {...props} />}
  </Mutation>
);

const UserAnonMutation = gql`
  mutation UserAnonSignIn($input: UserAnonInput!) {
    userSignInAnon(input: $input) {
      id
      email
    }
  }
`;

export default withAuth(LandingScreen);
