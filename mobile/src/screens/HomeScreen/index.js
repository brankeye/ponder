import { TabNavigator, StackNavigator } from 'react-navigation';
import { PoemListScreen, AuthorListScreen } from './screens';
import PoemScreen from '../PoemScreen';
import AuthorScreen from '../AuthorScreen';

const HomeScreen = TabNavigator({
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

export default StackNavigator(
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
