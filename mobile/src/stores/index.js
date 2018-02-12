import { useStrict } from 'mobx';
import PoemStore from './PoemStore';
import FavoriteStore from './FavoriteStore';

useStrict(true);

class RootStore {
  constructor() {
    this.poems = new PoemStore(() => this);
    //this.favorites = new FavoriteStore(() => this);
  }
}

export default new RootStore();
