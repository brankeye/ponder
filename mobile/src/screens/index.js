import React from 'react';
import { createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { Drawer } from '@@components';
import LoadingScreen from './LoadingScreen';
import LandingScreen from './LandingScreen';
import HomeScreen from './HomeScreen';
import LibraryScreen from './LibraryScreen';
import RecentsScreen from './RecentsScreen';
import SettingsScreen from './SettingsScreen';

const AppNavigator = createDrawerNavigator(
  {
    HomeDrawer: {
      screen: HomeScreen,
      navigationOptions: {
        drawerLabel: 'Home',
      },
    },
    RecentsDrawer: {
      screen: RecentsScreen,
      navigationOptions: {
        drawerLabel: 'Recents',
      },
    },
    LibraryDrawer: {
      screen: LibraryScreen,
      navigationOptions: {
        drawerLabel: 'Library',
      },
    },
    SettingsDrawer: {
      screen: SettingsScreen,
      navigationOptions: {
        drawerLabel: 'Settings',
      },
    },
  },
  {
    contentComponent: Drawer,
  }
);

export default createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Landing: LandingScreen,
    App: AppNavigator,
  },
  {
    initialRouteName: 'Loading',
  }
);
