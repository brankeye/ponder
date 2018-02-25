import { StackNavigator, TabNavigator } from 'react-navigation';
import { LandingPage, FavoritesPage, PoemPage } from 'components/pages';

const MainNavigator = TabNavigator({
  Landing: { screen: LandingPage },
  Favorites: { screen: FavoritesPage }
});

const RootNavigator = StackNavigator(
  {
    Main: { screen: MainNavigator },
    Poem: { screen: PoemPage }
  },
  {
    headerMode: 'none'
  }
);

export default RootNavigator;
