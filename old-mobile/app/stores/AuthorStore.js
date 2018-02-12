import { action, observable, computed } from 'mobx';
import uuid from 'uuid';
import remotedev from 'mobx-remotedev';

@remotedev({ name: 'Authors' })
class AuthorStore {
  @observable test = "TEST";

  constructor(rs) {
    this.rootStore = rs;
  }
}

export default AuthorStore;
