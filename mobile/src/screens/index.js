import React from 'react';
import { createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import { Drawer } from '@@components';
import HomeScreen from './HomeScreen';
import LibraryScreen from './LibraryScreen';
import RecentsScreen from './RecentsScreen';
import SettingsScreen from './SettingsScreen';

export default createDrawerNavigator(
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
