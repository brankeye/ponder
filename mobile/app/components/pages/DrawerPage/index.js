import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { inject, observer } from 'mobx-react';
import pages from 'constants/screens';
import OAuthManager from 'react-native-oauth';
import { app_name, google, client_secret } from 'constants/oauth';
import firebase from 'utilities/firebase';

const manager = new OAuthManager(app_name);

class DrawerPage extends Component {
  handleNavigation = (screen, title) => {
    this.props.navigation.resetRoot({
      screen,
      title,
      navigatorStyle: this.props.theme.navBarStyle
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

const page = inject('navigation', 'theme')(observer(DrawerPage));
export default page;
