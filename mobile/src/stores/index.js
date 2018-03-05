import { useStrict } from 'mobx';
import PoemStore from './PoemStore';
import UserStore from './UserStore';

useStrict(true);

class RootStore {
  constructor() {
    this.poems = new PoemStore(() => this);
    this.user = new UserStore(() => this);
  }
}

export default new RootStore();
