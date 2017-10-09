import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { inject, observer } from 'mobx-react';
import pages from 'constants/screens';

class DrawerPage extends Component {
  handleNavigation = (screen, title) => {
    this.props.navigator.handleDeepLink({
      link: 'drawer',
      payload: { screen, title }
    });
  };

  showFeaturedPage = () => {
    this.handleNavigation(pages.PoemPage, 'Featured');
  };

  showLibraryPage = () => {
    this.handleNavigation(pages.LibraryPage, 'Library');
  };

  showFavoritesPage = () => {
    this.handleNavigation(pages.FavoritesPage, 'Favorites');
  };

  showLoginPage = () => {
    this.props.navigator.handleDeepLink({
      link: 'drawer',
      payload: {
        screen: pages.LoginPage,
        navigatorStyle: { ...this.props.theme.navBarStyle, navBarHidden: true }
      }
    });
  };

  handleSignout = () => {};

  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 60,
          backgroundColor: this.props.theme.appTheme.pageBackgroundColor
        }}
      >
        <Text onPress={this.showFeaturedPage}>Daily poem</Text>
        <Text onPress={this.showLibraryPage}>Library</Text>
        <Text onPress={this.showFavoritesPage}>Favorites</Text>
        <Button title="Sign In" onPress={this.showLoginPage} />
        <Button title="Sign Out" onPress={this.handleSignout} />
      </View>
    );
  }
}

const page = inject('theme')(observer(DrawerPage));
export default page;
