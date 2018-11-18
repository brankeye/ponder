import React from 'react';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import RecentAuthors from './RecentAuthors';
import RecentPoems from './RecentPoems';
import PoemScreen from '../PoemScreen';
import AuthorScreen from '../AuthorScreen';
import { TabBar, HeaderBar } from '@@components';

const RecentsScreen = createMaterialTopTabNavigator(
  {
    RecentPoems: {
      screen: RecentPoems,
      navigationOptions: {
        title: 'Poems',
      },
    },
    RecentAuthors: {
      screen: RecentAuthors,
      navigationOptions: {
        title: 'Authors',
      },
    },
  },
  {
    tabBarComponent: TabBar,
  }
);

export default createStackNavigator({
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
});
