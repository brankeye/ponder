import React from 'react';
import {
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import { Drawer } from '@@components';
import LoadingScreen from './LoadingScreen';
import HomeScreen from './HomeScreen';
import LibraryScreen from './LibraryScreen';
import RecentsScreen from './RecentsScreen';

const AppNavigator = createBottomTabNavigator({
  HomeDrawer: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
    },
  },
  RecentsDrawer: {
    screen: RecentsScreen,
    navigationOptions: {
      title: 'Recents',
    },
  },
  LibraryDrawer: {
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
