import { action, observable, computed, runInAction } from "mobx";
import uuid from 'uuid';
import firebase from 'utilities/firebase';
import remotedev from 'mobx-remotedev';

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

  fetchPoems = async () => {
    const snapshot = await firebase
      .database()
      .ref('poemInfos')
      .once('value');
    const poems = snapshot.val();
    if (poems) {
      runInAction("fetchPoems", () => {
        this.poemList = poems;
      }, this);
    }
  };

  @action get = id => this.poemList[id];

  selectPoem = async id => {
    const snapshot = await firebase
      .database()
      .ref('poems')
      .child(id)
      .once('value');

    runInAction("selectPoem", () => {
      const poem = snapshot.val();
      if (poem) {
        const { title, authorName } = this.poemList[id];
        this.selectedPoem = {
          id,
          title,
          authorName,
          content: poem.lines.join('\n')
        };
        console.log('Selected: ', this.selectedPoem);
      } else {
        this.selectedPoem = {
          id,
          content: "None",
        };
      }
    }, this);
  };
}

export default PoemStore;
