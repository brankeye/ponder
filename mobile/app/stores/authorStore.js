import { action, observable } from 'mobx';

class AuthorStore {
  @observable author = "John Keats";

  @action setAuthor = text => {
    this.author = text;
  };
}

const store = new AuthorStore();
export default store;
