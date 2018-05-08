import { createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import PoemScreen from '../PoemScreen';

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
