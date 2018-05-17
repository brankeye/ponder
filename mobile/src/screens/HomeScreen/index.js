import React from 'react';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { PoemListScreen, AuthorListScreen } from './screens';
import PoemScreen from '../PoemScreen';
import AuthorScreen from '../AuthorScreen';
import { TabBar, HeaderBar } from '@@components';

const HomeScreen = createMaterialTopTabNavigator(
  {
    PoemsList: {
      screen: PoemListScreen,
      navigationOptions: {
        title: 'Poems',
      },
    },
    AuthorsList: {
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
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
      header: props => (
        <HeaderBar {...props} stateKey="Home" title="Home" searchable />
      ),
    },
  },
  Poem: {
    screen: PoemScreen,
    navigationOptions: {
      title: 'Poem',
      header: props => <HeaderBar {...props} title="Poem" />,
    },
  },
  Author: {
    screen: AuthorScreen,
    navigationOptions: {
      title: 'Author',
      header: props => <HeaderBar {...props} title="Author" searchable />,
    },
  },
});
