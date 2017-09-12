import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { inject, observer } from 'mobx-react';
import composePage from 'components/pages/composePage';
import {
  PAGE_FEATURED,
  PAGE_LIBRARY,
  PAGE_FAVORITES,
  PAGE_DRAWER
} from 'constants/screens';

class Drawer extends Component {
  handleNavigation = (screen, title) => {
    this.props.navigation.resetRoot({
      screen,
      title,
      navigatorStyle: this.props.theme.navBarStyle
    });
  };

  render() {
    return (
      <View>
        <Text
          onPress={this.handleNavigation.bind(this, PAGE_FEATURED, 'Featured')}
        >
          Daily poem
        </Text>
        <Text
          onPress={this.handleNavigation.bind(this, PAGE_LIBRARY, 'Library')}
        >
          Library
        </Text>
        <Text
          onPress={this.handleNavigation.bind(
            this,
            PAGE_FAVORITES,
            'Favorites'
          )}
        >
          Favorites
        </Text>
      </View>
    );
  }
}

const page = inject('theme', 'navigation')(observer(Drawer));
export default composePage(page);
