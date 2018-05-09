import { createMaterialTopTabNavigator } from 'react-navigation';
import { PoemListScreen, AuthorListScreen } from './screens';

export default createMaterialTopTabNavigator({
  RecentPoems: {
    screen: PoemListScreen,
    navigationOptions: {
      title: 'Poems',
    },
  },
  RecentAuthors: {
    screen: AuthorListScreen,
    navigationOptions: {
      title: 'Authors',
    },
  },
});
