import { action, observable, computed } from "mobx";
import config from "./config";
import store from "./index";

class favorites {
  @observable poemList = {};

  @computed get poemArray() {
    return observable(Object.keys(this.poemList).map(id => {
      return observable({
        id,
        ...this.poemList[id]
      });
    }));
  };

  @action add = id => {
    console.log(id);
    const poem = store.poems.get(id);
    this.poemList[id] = poem;
  }
}

export default (new favorites());
