import { Navigation } from 'react-native-navigation';
import registerScreens from './screens/registerScreens';
import { PAGE_FEATURED, PAGE_DRAWER } from './screens/screenNames';

registerScreens();

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
