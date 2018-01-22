import { action, observable, computed, runInAction, useStrict } from "mobx";
import uuid from 'uuid';
import firebase from 'utilities/firebase';
import remotedev from 'mobx-remotedev';

useStrict(true);

@remotedev({ name: 'Poems' })
class PoemStore {
  constructor(rs) {
    this.rootStore = rs;
  }

  @observable selectedPoem = {};

  @observable poemList = {};

  @computed get poemArray() {
    return observable(Object.keys(this.poemList).map(id => {
      return observable({
        id,
        ...this.poemList[id]
      });
    }));
  };

  @action fetchPoems = async () => {
    const snapshot = await firebase
      .database()
      .ref('poemInfos')
      .once('value');
    const poems = snapshot.val();
    if (poems) {
      this.poemList = poems;
      var id = Object.keys(poems)[0];
      await this.selectPoem(id);
    }
  };

  @action get = id => this.poemList[id];

  @action selectPoem = async id => {
    const snapshot = await firebase
      .database()
      .ref('poems')
      .child(id)
      .once('value');

    const poem = snapshot.val();
    if (poem) {
      const { title, authorName } = this.poemList[id];
      this.selectedPoem = {
        id,
        title,
        authorName,
        content: poem.lines.join('\n')
      };
    } else {
      this.selectedPoem = {
        id,
        content: "None",
      };
    }
  };
}

export default PoemStore;
