import React from 'react';
import { View, Button, AsyncStorage } from 'react-native';
import Expo from 'expo';
import { FACEBOOK_APP_ID } from '@@config';
import { AuthConsumer } from '@@consumers';

class Authenticator extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {({ signInWithFacebook }) => (
          <View>
            <Button title="Facebook" onPress={signInWithFacebook} />
          </View>
        )}
      </AuthConsumer>
    );
  }
}

export default Authenticator;
