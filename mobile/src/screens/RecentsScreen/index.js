import { createMaterialTopTabNavigator } from 'react-navigation';
import { PoemListScreen, AuthorListScreen } from './screens';

export default createMaterialTopTabNavigator({
  RecentPoems: { screen: PoemListScreen },
  RecentAuthors: { screen: AuthorListScreen },
});
