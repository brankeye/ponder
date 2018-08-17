import React from 'react';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { PoemListScreen, AuthorListScreen } from './screens';
import PoemScreen from '../PoemScreen';
import AuthorScreen from '../AuthorScreen';
import { TabBar, HeaderBar } from '@@components';

const LibraryScreen = createMaterialTopTabNavigator(
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
});
