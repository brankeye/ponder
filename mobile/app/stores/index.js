import remotedev from 'mobx-remotedev';
import makeConfig from './config';
import poems from './poems';
import theme from './theme';
import favorites from './favorites';
import navigation from './navigation';

const store = {
  poems: remotedev(poems, makeConfig({ name: 'Poems' })),
  theme: remotedev(theme, makeConfig({ name: 'Theme' })),
  favorites: remotedev(favorites, makeConfig({ name: 'Favorites' })),
  navigation: remotedev(navigation, makeConfig({ name: 'Navigation' }))
};

export default store;
