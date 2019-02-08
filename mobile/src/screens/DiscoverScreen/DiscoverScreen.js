import React from 'react';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import PoemScreen from '../PoemScreen';
import DiscoverPoem from './DiscoverPoem';
import DiscoverAuthor from './DiscoverAuthor';
import AuthorScreen from '../AuthorScreen';
import { TabBar, HeaderBar } from '@@components';

const DiscoverScreen = createMaterialTopTabNavigator(
  {
    DiscoverPoem: {
      screen: DiscoverPoem,
      navigationOptions: {
        title: 'Poems',
      },
    },
    DiscoverAuthor: {
      screen: DiscoverAuthor,
      navigationOptions: {
        title: 'Authors',
      },
    },
  },
  {
    tabBarComponent: TabBar,
  }
);

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
      backgroundColor: 'transparent',
    },
  }
);
