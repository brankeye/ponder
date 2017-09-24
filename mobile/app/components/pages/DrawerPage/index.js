import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { inject, observer } from 'mobx-react';
import pages from 'constants/screens';

class DrawerPage extends Component {
  handleNavigation = (screen, title) => {
    this.props.navigation.resetRoot({
      screen,
      title,
      navigatorStyle: this.props.theme.navBarStyle
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 30,
          marginTop: 30,
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
      </View>
    );
  }
}

const page = inject('navigation', 'theme')(observer(DrawerPage));
export default page;
