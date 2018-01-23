import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import pages from 'constants/screens';

class DrawerPage extends Component {
  async componentDidMount() {
    await this.props.poems.fetchPoems();
    var id = Object.keys(this.props.poems.poemList)[0];
    await this.props.poems.selectPoem(id);
  }

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
        <Text onPress={this.showFeaturedPage} style={{ paddingVertical: 40 }}>
          Daily poem
        </Text>
        <Text onPress={this.showLibraryPage} style={{ paddingVertical: 40 }}>
          Library
        </Text>
        <Text onPress={this.showFavoritesPage} style={{ paddingVertical: 40 }}>
          Favorites
        </Text>
        {this.props.user.isSignedIn ? (
          <Button title="Sign Out" onPress={this.handleSignout} />
        ) : (
          <Button title="Sign In" onPress={this.showLoginPage} />
        )}
      </View>
    );
  }
}

const page = inject('theme', 'poems', 'user')(observer(DrawerPage));
export default page;
