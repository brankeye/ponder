import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { SocialIcon } from 'react-native-elements';
import composePage from 'components/pages/composePage';
import { authorize } from 'utilities/authorizer';

class LoginPage extends Component {
  state = {};

  handleGoogleSignin = async () => {
    const user = await authorize('google');
    if (user) {
      this.setState({ displayName: user._user.displayName });
    }
  };

  handleFacebookSignin = async () => {
    const user = await authorize('facebook');
    if (user) {
      this.setState({ displayName: user._user.displayName });
    }
  };

  handleTwitterSignin = async () => {
    const user = await authorize('twitter');
    if (user) {
      this.setState({ displayName: user._user.displayName });
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {this.state.displayName ? (
          <Text>Signed in as {this.state.displayName}</Text>
        ) : (
          <Text>Not signed in</Text>
        )}
        <View style={{ alignSelf: 'stretch', marginHorizontal: 40 }}>
          <SocialIcon
            title="Sign in with Google"
            button
            type="google-plus-official"
            onPress={this.handleGoogleSignin}
          />
          <SocialIcon
            title="Sign in with Facebook"
            button
            type="facebook"
            onPress={this.handleFacebookSignin}
          />
          <SocialIcon
            title="Sign in with Twitter"
            button
            type="twitter"
            onPress={this.handleTwitterSignin}
          />
        </View>
      </View>
    );
  }
}

const page = inject('favorites', 'poems')(composePage(LoginPage));
export default page;
