import { Navigation } from 'react-native-navigation';
import Home from '../components/pages/Home';
import Sample from '../components/pages/Sample';
import store from '../stores/store';
import Provider from '../components/providers/Provider';
import { APP_HOME, APP_SAMPLE } from './screenNames';

export default (registerScreens = () => {
  Navigation.registerComponent(APP_HOME, () => Home, store, Provider);
  Navigation.registerComponent(APP_SAMPLE, () => Sample, store, Provider);
});
