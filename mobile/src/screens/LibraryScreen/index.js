import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { PoemListScreen, AuthorListScreen } from './screens';
import PoemScreen from '../PoemScreen';
import AuthorScreen from '../AuthorScreen';
import { TabBar } from '@@components';

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

export default createStackNavigator(
  {
    Home: {
      screen: LibraryScreen,
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
