import { action, observable, computed } from "mobx";
import config from "./config";
import store from "./index";

class favorites {
  @observable poemList = {};

  @computed get poemArray() {
    return Object.keys(this.poemList).map(id => {
      return {
        id,
        ...this.poemList[id]
      };
    });
  };

  @action add = id => this.poemList[id] = store.poems.get(id);

  @action remove = id => delete this.poemList[id];
}

export default (new favorites());
