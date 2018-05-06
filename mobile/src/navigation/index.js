import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import {
  HomeScreen,
  RecentsScreen,
  LibraryScreen,
  SettingsScreen,
} from '@@components/screens';

const AppNavigator = DrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  Recents: {
    screen: RecentsScreen,
  },
  Library: {
    screen: LibraryScreen,
  },
  Settings: {
    screen: SettingsScreen,
  },
});

export default AppNavigator;
