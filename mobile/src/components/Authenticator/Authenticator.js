import React from 'react';
import { View, Button, AsyncStorage } from 'react-native';
import Expo from 'expo';
import { FACEBOOK_APP_ID } from '@@config';
import { Auth } from '@@utils';
import { Buffer } from 'buffer';

class Authenticator extends React.Component {
  signInWithFacebook = async () => {
    const {
      type,
      token,
      expires,
    } = await Expo.Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID);
    switch (type) {
      case 'cancel': {
        console.log('Cancel: ', { type });
        return { type };
      }
      case 'success': {
        const accessToken = { provider: 'facebook', token, expires };
        const encodedToken = Buffer.from(JSON.stringify(accessToken)).toString(
          'base64'
        );
        Auth.setAccessToken(encodedToken);
        await AsyncStorage.setItem(
          'oauth',
          JSON.stringify({ accessToken, encodedToken })
        );
        console.log('Success: ', { type, token, expires });
        return {
          type,
          token,
          expires,
        };
      }
    }
  };

  render() {
    return (
      <View>
        <Button title="Facebook" onPress={this.signInWithFacebook} />
      </View>
    );
  }
}

export default Authenticator;
