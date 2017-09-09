import remotedev from 'mobx-remotedev';
import config from './config';
import poems from './poems';
import theme from './theme';
import navigation from './navigation';

const store = {
  poems: remotedev(poems, config),
  theme: remotedev(theme, config),
  navigation: remotedev(navigation, config)
};

export default store;
