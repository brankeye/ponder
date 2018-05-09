import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { PoemListScreen, AuthorListScreen } from './screens';
import PoemScreen from '../PoemScreen';

const LibraryScreen = createMaterialTopTabNavigator({
  PoemsLibrary: { screen: PoemListScreen },
  AuthorsLibrary: { screen: AuthorListScreen },
});

export default createStackNavigator(
  {
    Home: {
      screen: LibraryScreen,
    },
    Poem: {
      screen: PoemScreen,
    },
  },
  {
    headerMode: 'none',
  }
);
