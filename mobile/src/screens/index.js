import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { IconButton } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import LandingScreen from './LandingScreen';
import DiscoverScreen from './DiscoverScreen';
import LibraryScreen from './LibraryScreen';
import RecentsScreen from './RecentsScreen';

const iconSize = 18;

const AppNavigator = createMaterialBottomTabNavigator({
  HomeTab: {
    screen: DiscoverScreen,
    navigationOptions: {
      title: 'Discover',
      tabBarIcon: ({ tintColor }) => (
        <IconButton
          icon="home"
          color={tintColor}
          size={iconSize}
          style={{ height: iconSize, paddingBottom: 5 }}
        >
          Discover
        </IconButton>
      ),
    },
  },
  RecentsTab: {
    screen: RecentsScreen,
    navigationOptions: {
      title: 'Recents',
      tabBarIcon: ({ tintColor }) => (
        <IconButton
          icon="history"
          color={tintColor}
          size={iconSize}
          style={{ height: iconSize, paddingBottom: 5 }}
        >
          Discover
        </IconButton>
      ),
    },
  },
  LibraryTab: {
    screen: LibraryScreen,
    navigationOptions: {
      title: 'Library',
      tabBarIcon: ({ tintColor }) => (
        <IconButton
          icon="bookmark-border"
          color={tintColor}
          size={iconSize}
          style={{ height: iconSize, paddingBottom: 5 }}
        >
          Discover
        </IconButton>
      ),
    },
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Landing: LandingScreen,
      App: AppNavigator,
    },
    {
      initialRouteName: 'Landing',
    }
  )
);
