import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import {
  HomeScreen,
  RecentsScreen,
  LibraryScreen,
  SettingsScreen,
} from '@@components/screens';

const AppNavigator = createDrawerNavigator({
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

export default AppNavigator;
