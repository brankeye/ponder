import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import LibraryScreen from './LibraryScreen';
import RecentsScreen from './RecentsScreen';
import SettingsScreen from './SettingsScreen';

export default createDrawerNavigator({
  HomeDrawer: {
    screen: HomeScreen,
  },
  RecentsDrawer: {
    screen: RecentsScreen,
  },
  LibraryDrawer: {
    screen: LibraryScreen,
  },
  SettingsDrawer: {
    screen: SettingsScreen,
  },
});
