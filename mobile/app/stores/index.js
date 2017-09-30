import remotedev from 'mobx-remotedev';
import makeConfig from './config';
import poems from './poems';
import theme from './theme';
import favorites from './favorites';

const store = {
  poems: remotedev(poems, makeConfig({ name: 'Poems' })),
  theme: remotedev(theme, makeConfig({ name: 'Theme' })),
  favorites: remotedev(favorites, makeConfig({ name: 'Favorites' }))
};

export default store;
