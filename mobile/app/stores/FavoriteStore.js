import { action, observable, computed } from "mobx";
import remotedev from 'mobx-remotedev';

@remotedev({ name: 'Favorites' })
class FavoriteStore {
  constructor(rs) {
    this.rootStore = rs;
  }

  @observable poemList = {};

  @computed get poemArray() {
    return Object.keys(this.poemList).map(id => {
      return {
        id,
        ...this.rootStore().poems.poemList[id]
      };
    });
  };

  @action add = id => this.poemList[id] = true;

  @action remove = id => delete this.poemList[id];

  @action isFavorite = id => this.poemList[id] === true;
}

export default FavoriteStore;
