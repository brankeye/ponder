import { Navigation } from 'react-native-navigation';
import Featured from '../components/pages/Featured';
import Library from '../components/pages/Library';
import Favorites from '../components/pages/Favorites';
import Drawer from '../components/pages/Drawer';
import store from '../stores/store';
import StoreProvider from '../components/providers/StoreProvider';
import {
  PAGE_FEATURED,
  PAGE_LIBRARY,
  PAGE_FAVORITES,
  PAGE_DRAWER
} from './screenNames';

export default (registerScreens = () => {
  Navigation.registerComponent(
    PAGE_FEATURED,
    () => Featured,
    store,
    StoreProvider
  );
  Navigation.registerComponent(
    PAGE_LIBRARY,
    () => Library,
    store,
    StoreProvider
  );
  Navigation.registerComponent(
    PAGE_FAVORITES,
    () => Favorites,
    store,
    StoreProvider
  );
  Navigation.registerComponent(PAGE_DRAWER, () => Drawer, store, StoreProvider);
});
