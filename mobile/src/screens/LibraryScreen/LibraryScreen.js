import React from 'react';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import LibraryPoems from './LibraryPoems';
import LibraryAuthors from './LibraryAuthors';
import PoemScreen from '../PoemScreen';
import AuthorScreen from '../AuthorScreen';
import { HeaderBar } from '@@components';
import { getTabBarOptions } from '@@screens/utils';

const LibraryScreen = createMaterialTopTabNavigator({
  LibraryPoems: {
    screen: LibraryPoems,
    navigationOptions: ({ screenProps: { theme } }) => ({
      title: 'Poems',
      tabBarOptions: getTabBarOptions(theme),
    }),
  },
  LibraryAuthors: {
    screen: LibraryAuthors,
    navigationOptions: ({ screenProps: { theme } }) => ({
      title: 'Authors',
      tabBarOptions: getTabBarOptions(theme),
    }),
  },
});

export default createStackNavigator(
  {
    Home: {
      screen: LibraryScreen,
      navigationOptions: {
        title: 'Library',
        header: props => (
          <HeaderBar
            {...props}
            name="LibraryHeader"
            title="Library"
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
