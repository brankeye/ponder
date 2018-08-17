import React from 'react';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { PoemListScreen, AuthorListScreen } from './screens';
import PoemScreen from '../PoemScreen';
import AuthorScreen from '../AuthorScreen';
import { TabBar, HeaderBar } from '@@components';

const RecentsScreen = createMaterialTopTabNavigator(
  {
    PoemsLibrary: {
      screen: PoemListScreen,
      navigationOptions: {
        title: 'Poems',
      },
    },
    AuthorsLibrary: {
      screen: AuthorListScreen,
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
