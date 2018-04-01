import { action, observable, computed, runInAction } from 'mobx';
import uuid from 'uuid';
import remotedev from 'mobx-remotedev';

@remotedev({ name: 'Poems' })
class PoemStore {
  constructor(rs) {
    this.rootStore = rs;
  }

  @observable poems = [];
}

export default PoemStore;
