import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Drawer } from '@@components';
import LandingScreen from './LandingScreen';
import DiscoverScreen from './DiscoverScreen';
import LibraryScreen from './LibraryScreen';
import RecentsScreen from './RecentsScreen';

const AppNavigator = createMaterialBottomTabNavigator({
  HomeTab: {
    screen: DiscoverScreen,
    navigationOptions: {
      title: 'Discover',
    },
  },
  RecentsTab: {
    screen: RecentsScreen,
    navigationOptions: {
      title: 'Recents',
    },
  },
  LibraryTab: {
    screen: LibraryScreen,
    navigationOptions: {
      title: 'Library',
    },
  },
});

export default createSwitchNavigator(
  {
    Landing: LandingScreen,
    App: AppNavigator,
  },
  {
    initialRouteName: 'Landing',
  }
);
