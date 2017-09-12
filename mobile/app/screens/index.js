import { Navigation } from 'react-native-navigation';
import StoreProvider from 'stores/provider/StoreProvider';
import store from 'stores';
import { Featured, Library, Favorites, Drawer } from 'components/pages';
import {
  PAGE_FEATURED,
  PAGE_LIBRARY,
  PAGE_FAVORITES,
  PAGE_DRAWER
} from 'constants/screens';

export const registerScreens = () => {
  registerComponent(PAGE_FEATURED, () => Featured);
  registerComponent(PAGE_LIBRARY, () => Library);
  registerComponent(PAGE_FAVORITES, () => Favorites);
  registerComponent(PAGE_DRAWER, () => Drawer);
};

const registerComponent = (name, getComponent) => {
  Navigation.registerComponent(name, getComponent, store, StoreProvider);
};

export const startApp = () =>
  Navigation.startSingleScreenApp({
    screen: {
      screen: PAGE_FEATURED,
      title: 'Featured'
    },
    drawer: {
      left: {
        screen: PAGE_DRAWER
      }
    }
  });
