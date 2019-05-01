import React from 'react';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import RecentAuthors from './RecentAuthors';
import RecentPoems from './RecentPoems';
import PoemScreen from '../PoemScreen';
import AuthorScreen from '../AuthorScreen';
import { HeaderBar } from '@@components';
import { getTabBarOptions } from '@@screens/utils';

const RecentsScreen = createMaterialTopTabNavigator({
  RecentPoems: {
    screen: RecentPoems,
    navigationOptions: ({ screenProps: { theme } }) => ({
      title: 'Poems',
      tabBarOptions: getTabBarOptions(theme),
    }),
  },
  RecentAuthors: {
    screen: RecentAuthors,
    navigationOptions: ({ screenProps: { theme } }) => ({
      title: 'Authors',
      tabBarOptions: getTabBarOptions(theme),
    }),
  },
});

export default createStackNavigator(
  {
    Home: {
      screen: RecentsScreen,
      navigationOptions: {
        title: 'Recents',
        header: props => (
          <HeaderBar
            {...props}
            name="RecentsHeader"
            title="Recents"
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
