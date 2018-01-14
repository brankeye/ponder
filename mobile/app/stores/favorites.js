import { action, observable, computed } from "mobx";
import config from "./config";
import store from "./index";

class favorites {
  @observable poemList = {};

  @computed get poemArray() {
    return Object.keys(this.poemList).map(id => {
      return {
        id,
        ...store.poems.poemList[id]
      };
    });
  };

  @action add = id => this.poemList[id] = true;

  @action remove = id => delete this.poemList[id];

  @action isFavorite = id => this.poemList[id];
}

export default (new favorites());
