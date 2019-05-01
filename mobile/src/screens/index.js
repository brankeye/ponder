import React from 'react';
import { Text } from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { IconButton } from 'react-native-paper';
import LandingScreen from './LandingScreen';
import DiscoverScreen from './DiscoverScreen';
import LibraryScreen from './LibraryScreen';
import RecentsScreen from './RecentsScreen';
import { getTabBarOptions, enhanceNavigatorWithTheme } from './utils';

const iconSize = 18;

const AppNavigator = createBottomTabNavigator({
  HomeTab: {
    screen: DiscoverScreen,
    navigationOptions: ({ screenProps: { theme } }) => ({
      tabBarIcon: ({ tintColor }) => (
        <IconButton
          icon="home"
          color={tintColor}
          size={iconSize}
          style={{ height: iconSize }}
        >
          Discover
        </IconButton>
      ),
      tabBarLabel: ({ tintColor }) => (
        <Text
          style={{
            color: tintColor,
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 5,
          }}
        >
          Discover
        </Text>
      ),
      tabBarOptions: getTabBarOptions(theme),
    }),
  },
  RecentsTab: {
    screen: RecentsScreen,
    navigationOptions: ({ screenProps: { theme } }) => ({
      tabBarIcon: ({ tintColor }) => (
        <IconButton
          icon="history"
          color={tintColor}
          size={iconSize}
          style={{ height: iconSize }}
        >
          Discover
        </IconButton>
      ),
      tabBarLabel: ({ tintColor }) => (
        <Text
          style={{
            color: tintColor,
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 5,
          }}
        >
          Recents
        </Text>
      ),
      tabBarOptions: getTabBarOptions(theme),
    }),
  },
  LibraryTab: {
    screen: LibraryScreen,
    navigationOptions: ({ screenProps: { theme } }) => ({
      tabBarIcon: ({ tintColor }) => (
        <IconButton
          icon="bookmark-border"
          color={tintColor}
          size={iconSize}
          style={{ height: iconSize }}
        >
          Discover
        </IconButton>
      ),
      tabBarLabel: ({ tintColor }) => (
        <Text
          style={{
            color: tintColor,
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 5,
          }}
        >
          Library
        </Text>
      ),
      tabBarOptions: getTabBarOptions(theme),
    }),
  },
});

export default enhanceNavigatorWithTheme(
  createAppContainer(
    createSwitchNavigator(
      {
        Landing: LandingScreen,
        App: AppNavigator,
      },
      {
        initialRouteName: 'Landing',
      }
    )
  )
);
