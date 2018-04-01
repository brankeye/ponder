import { action, observable, computed, runInAction } from 'mobx';
import uuid from 'uuid';
import remotedev from 'mobx-remotedev';

@remotedev({ name: 'User' })
class UserStore {
  constructor(rs) {
    this.rootStore = rs;
  }

  @observable user = {};
}

export default UserStore;
