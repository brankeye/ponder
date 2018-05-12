import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { Drawer } from '@@components';
import HomeScreen from './HomeScreen';
import LibraryScreen from './LibraryScreen';
import RecentsScreen from './RecentsScreen';
import SettingsScreen from './SettingsScreen';

export default DrawerNavigator(
  {
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
  },
  {
    contentComponent: Drawer,
  }
);
