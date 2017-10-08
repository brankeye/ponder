import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import { SocialIcon } from 'react-native-elements';
import composePage from 'components/pages/composePage';
import OAuthManager from 'react-native-oauth';
import { app_name, config } from 'constants/oauth';
import firebase from 'utilities/firebase';

const manager = new OAuthManager(app_name);

class LoginPage extends Component {
  state = {};

  handleGoogleSignin = () => {
    console.log('Handle google signin.');
    manager.configure(config);
    manager
      .authorize('google', { scopes: 'email' })
      .then(result => {
        console.log(JSON.stringify(result));
        const accessToken = result.response.credentials.accessToken;
        const credential = firebase.auth.GoogleAuthProvider.credential(
          null,
          accessToken
        );
        console.log('token: ' + accessToken);
        console.log(credential);
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(user => {
            console.log('User successfully signed in', user);
            this.setState({ email: user.email });
          })
          .catch(err => {
            console.error('User signin error', err);
          });
      })
      .catch(err => console.log(err));
  };

  handleFacebookSignin = () => {
    console.log('Handle facebook signin.');
    manager.configure(config);
    manager
      .authorize('facebook', { scopes: 'email' })
      .then(result => {
        console.log(JSON.stringify(result));
        const accessToken = result.response.credentials.accessToken;
        const credential = firebase.auth.FacebookAuthProvider.credential(
          accessToken
        );
        console.log('token: ' + accessToken);
        console.log(credential);
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(user => {
            console.log('User successfully signed in', user);
            this.setState({ email: user.email });
          })
          .catch(err => {
            console.error('User signin error', err);
          });
      })
      .catch(err => console.log(err));
  };

  handleTwitterSignin = () => {
    console.log('Handle twitter signin.');
    manager.configure(config);
    manager.deauthorize('twitter');
    manager
      .authorize('twitter', { scopes: 'email' })
      .then(result => {
        console.log(JSON.stringify(result));
        const accessToken = result.response.credentials.access_token;
        const credential = firebase.auth.TwitterAuthProvider.credential(
          accessToken,
          result.response.credentials.access_token_secret
        );
        console.log('token: ' + accessToken);
        console.log(credential);
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(user => {
            console.log('User successfully signed in', user);
            this.setState({ email: user.displayName });
          })
          .catch(err => {
            console.error('User signin error', err);
          });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {this.state.email ? (
          <Text>Signed in as {this.state.email}</Text>
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

const page = inject('favorites', 'poems')(composePage(observer(LoginPage)));
export default page;
