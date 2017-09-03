import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { inject, observer } from 'mobx-react';
import pageComposer from '../composers/pageComposer';
import { PAGE_FEATURED, PAGE_LIBRARY, PAGE_FAVORITES, PAGE_DRAWER } from '../../screens/screenNames';

@inject('navigation')
@observer
class Drawer extends Component {
  handleNavigation = (screen, title) => {
    this.props.navigation.resetRoot({
      screen,
      title,
      navigatorStyle: this.props.styles.navBarStyle
    });
  };

  render() {
    const { containerStyle, textStyle, navItemStyle } = this.props.appStyle;
    const linkStyle = [textStyle, navItemStyle];
    return(
      <View style={containerStyle}>
        <Text onPress={this.handleNavigation.bind(this, PAGE_FEATURED, 'Featured')} style={linkStyle}>Daily poem</Text>
        <Text onPress={this.handleNavigation.bind(this, PAGE_LIBRARY, 'Library')} style={linkStyle}>Library</Text>
        <Text onPress={this.handleNavigation.bind(this, PAGE_FAVORITES, 'Favorites')} style={linkStyle}>Favorites</Text>
      </View>
    )
  }
}

export default pageComposer(Drawer);
