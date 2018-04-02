import { configure } from 'mobx';
import AuthorStore from './AuthorStore';
import PoemStore from './PoemStore';
import UserStore from './UserStore';

configure({
  enforceActions: true,
});

class RootStore {
  constructor() {
    this.authors = new AuthorStore(() => this);
    this.poems = new PoemStore(() => this);
    this.user = new UserStore(() => this);
  }
}

export default new RootStore();
