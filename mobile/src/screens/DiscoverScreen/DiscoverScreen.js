import React from 'react';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import PoemScreen from '../PoemScreen';
import DiscoverPoem from './DiscoverPoem';
import DiscoverAuthor from './DiscoverAuthor';
import AuthorScreen from '../AuthorScreen';
import { HeaderBar } from '@@components';
import { getTabBarOptions } from '@@screens/utils';

const DiscoverScreen = createMaterialTopTabNavigator({
  DiscoverPoem: {
    screen: DiscoverPoem,
    navigationOptions: ({ screenProps: { theme } }) => ({
      title: 'Poems',
      tabBarOptions: getTabBarOptions(theme),
    }),
  },
  DiscoverAuthor: {
    screen: DiscoverAuthor,
    navigationOptions: ({ screenProps: { theme } }) => ({
      title: 'Authors',
      tabBarOptions: getTabBarOptions(theme),
    }),
  },
});

export default createStackNavigator(
  {
    Discover: {
      screen: DiscoverScreen,
      navigationOptions: {
        title: 'Discover',
        header: props => (
          <HeaderBar
            {...props}
            name="DiscoverHeader"
            title="Discover"
            themeable
            searchable
          />
        ),
      },
    },
    Poem: {
      screen: PoemScreen,
      navigationOptions: {
        title: 'Poem',
        header: props => <HeaderBar {...props} title="Poem" themeable />,
      },
    },
    Author: {
      screen: AuthorScreen,
      navigationOptions: {
        title: 'Author',
        header: props => <HeaderBar {...props} title="Author" themeable />,
      },
    },
  },
  {
    cardStyle: {
      opacity: 1,
      backgroundColor: 'transparent',
    },
    cardShadowEnabled: false,
  }
);
