import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { PoemListScreen, AuthorListScreen } from './screens';
import PoemScreen from '../PoemScreen';
import AuthorScreen from '../AuthorScreen';

const HomeScreen = createMaterialTopTabNavigator({
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
});

export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Poem: {
      screen: PoemScreen,
    },
    Author: {
      screen: AuthorScreen,
    },
  },
  {
    headerMode: 'none',
  }
);
