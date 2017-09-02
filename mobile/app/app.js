import { Navigation } from 'react-native-navigation';
import registerScreens from './screens/registerScreens';
import { APP_HOME } from './screens/screenNames';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: APP_HOME,
    title: 'Home'
  }
});
