import { useStrict, observable } from 'mobx';
import PoemStore from './PoemStore';
import ThemeStore from './ThemeStore';
import FavoriteStore from './FavoriteStore';
import UserStore from './UserStore';
import AuthorStore from './AuthorStore';

useStrict(true);

class RootStore {
  constructor() {
    this.theme = new ThemeStore(() => this);
    this.poems = new PoemStore(() => this);
    this.favorites = new FavoriteStore(() => this);
    this.user = new UserStore(() => this);
    this.authors = new AuthorStore(() => this);
  }
}

export default new RootStore();
