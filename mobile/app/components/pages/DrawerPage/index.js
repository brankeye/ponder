import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { inject, observer } from 'mobx-react';
import pages from 'constants/screens';
import OAuthManager from 'react-native-oauth';
import { app_name, google, client_secret } from 'constants/oauth';
import firebase from 'utilities/firebase';

const manager = new OAuthManager(app_name);

class DrawerPage extends Component {
  state = {
    email: ''
  };

  handleNavigation = (screen, title) => {
    this.props.navigator.handleDeepLink({
      link: 'drawer/' + screen,
      payload: { screen, title }
    });
  };

  handleSignin = () => {
    manager.configure(google);
    manager
      .authorize('google', { scopes: 'email' })
      .then(result => {
        console.log(result);
        const accessToken = result.response.credentials.accessToken;
        const credential = firebase.auth.GoogleAuthProvider.credential(
          null,
          accessToken
        );
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

  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 60,
          backgroundColor: this.props.theme.appTheme.pageBackgroundColor
        }}
      >
        <Text>{this.state.email}</Text>
        <Text
          onPress={this.handleNavigation.bind(this, pages.PoemPage, 'Featured')}
        >
          Daily poem
        </Text>
        <Text
          onPress={this.handleNavigation.bind(
            this,
            pages.LibraryPage,
            'Library'
          )}
        >
          Library
        </Text>
        <Text
          onPress={this.handleNavigation.bind(
            this,
            pages.FavoritesPage,
            'Favorites'
          )}
        >
          Favorites
        </Text>
        <Button title="Sign In" onPress={this.handleSignin} />
      </View>
    );
  }
}

const page = inject('theme')(observer(DrawerPage));
export default page;
