import { action, observable, computed, runInAction } from 'mobx';
import uuid from 'uuid';
import remotedev from 'mobx-remotedev';

@remotedev({ name: 'Authors' })
class AuthorStore {
  constructor(rs) {
    this.rootStore = rs;
  }

  @observable authors = [];
}

export default AuthorStore;
