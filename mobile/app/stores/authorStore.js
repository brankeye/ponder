import { action, observable } from 'mobx';
import remotedev from 'mobx-remotedev';
import config from './config';

@remotedev(config)
class AuthorStore {
  @observable author = "John Keats";

  @action setAuthor = text => {
    this.author = text;
  };
}

const store = new AuthorStore();
export default store;
