import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Drawer } from '@@components';
import LoadingScreen from './LoadingScreen';
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
    Loading: LoadingScreen,
    App: AppNavigator,
  },
  {
    initialRouteName: 'Loading',
  }
);
