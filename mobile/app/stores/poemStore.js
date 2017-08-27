import { action, observable } from 'mobx';

class PoemStore {
  @observable poem = "Hyperion";

  @action setPoem = text => {
    this.poem = text;
  };
}

const store = new PoemStore();
export default store;
