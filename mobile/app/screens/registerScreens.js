import { Navigation } from 'react-native-navigation';
import Home from '../components/pages/Home';
import Poem from '../components/pages/Poem';
import store from '../stores/store';
import StoreProvider from '../components/providers/StoreProvider';
import { PAGE_HOME, PAGE_POEM } from './screenNames';

export default (registerScreens = () => {
  Navigation.registerComponent(PAGE_HOME, () => Home, store, StoreProvider);
  Navigation.registerComponent(PAGE_POEM, () => Poem, store, StoreProvider);
});
