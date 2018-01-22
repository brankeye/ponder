import { observable, action } from 'mobx';
import remotedev from 'mobx-remotedev';

@remotedev({ name: 'Users' })
class UserStore {
  constructor(rs) {
    this.rootStore = rs;
  }

  @observable isSignedIn = false;
  @observable id = '53737b83-0333-4b33-aa09-24d6d5f21ff5';

  @action signIn = () => {
    this.isSignedIn = true;
  }

  @action signOut = () => {
    this.isSignedIn = false;
  }
}

export default UserStore;
