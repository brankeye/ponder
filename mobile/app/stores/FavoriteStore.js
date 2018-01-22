import { action, observable, computed, runInAction } from "mobx";
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

  @computed get isFavorite() {
    return runInAction(() => {
      return this.poemList[this.rootStore().poems.selectedPoem.id] === true;
    });
  }
}

export default FavoriteStore;
