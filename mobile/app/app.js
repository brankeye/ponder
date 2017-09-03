import { Navigation } from 'react-native-navigation';
import registerScreens from './screens/registerScreens';
import { PAGE_HOME } from './screens/screenNames';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: PAGE_HOME
  }
});
