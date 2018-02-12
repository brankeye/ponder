import { TabNavigator } from 'react-navigation';
import { LandingPage, FavoritesPage } from 'components/pages';

export default TabNavigator({
  Landing: { screen: LandingPage },
  Favorites: { screen: FavoritesPage }
});
