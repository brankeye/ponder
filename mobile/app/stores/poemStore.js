import { action, observable } from 'mobx';
import remotedev from 'mobx-remotedev';
import config from './config';

@remotedev(config)
class PoemStore {
  @observable poem = "Hyperion";

  @action setPoem = text => {
    this.poem = text;
  };
}

const store = new PoemStore();
export default store;
