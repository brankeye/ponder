import { TabNavigator } from 'react-navigation';
import { PoemListScreen, AuthorListScreen } from './screens';

export default TabNavigator({
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
