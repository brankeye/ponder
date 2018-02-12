import { Navigation } from 'react-native-navigation';
import StoreProvider from 'stores/provider/StoreProvider';
import stores from 'stores';
import {
  PoemPage,
  LibraryPage,
  FavoritesPage,
  DrawerPage,
  LoginPage
} from 'components/pages';
import pages from 'constants/screens';

export const registerScreens = () => {
  registerComponent(pages.PoemPage, () => PoemPage);
  registerComponent(pages.LibraryPage, () => LibraryPage);
  registerComponent(pages.FavoritesPage, () => FavoritesPage);
  registerComponent(pages.DrawerPage, () => DrawerPage);
  registerComponent(pages.LoginPage, () => LoginPage);
};

const registerComponent = (name, getComponent) => {
  Navigation.registerComponent(name, getComponent, stores, StoreProvider);
};

export const startApp = () =>
  Navigation.startSingleScreenApp({
    screen: {
      screen: pages.PoemPage,
      title: 'Featured'
    },
    drawer: {
      left: {
        screen: pages.DrawerPage
      }
    },
    appStyle: {
      keepStyleAcrossPush: false
    }
  });
