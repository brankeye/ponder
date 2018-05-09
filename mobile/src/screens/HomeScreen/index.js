import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { PoemListScreen, AuthorListScreen } from './screens';
import PoemScreen from '../PoemScreen';

const HomeScreen = createMaterialTopTabNavigator({
  PoemsList: { screen: PoemListScreen },
  AuthorsList: { screen: AuthorListScreen },
});

export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Poem: {
      screen: PoemScreen,
    },
  },
  {
    headerMode: 'none',
  }
);
