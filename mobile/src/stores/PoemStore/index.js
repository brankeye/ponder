import { action, observable, computed, runInAction } from 'mobx';
import uuid from 'uuid';
import { firebase } from 'utilities';
//import remotedev from 'mobx-remotedev';

//@remotedev({ name: 'Poems' })
class PoemStore {
  constructor(rs) {
    this.rootStore = rs;
  }

  @observable selectedPoem = {};

  @observable list = [];

  @computed
  get poemArray() {
    return observable(
      Object.keys(this.list).map(id => {
        return observable({
          id,
          ...this.list[id]
        });
      })
    );
  }

  fetchPoems = async () => {
    const snapshot = await firebase
      .database()
      .ref('poemInfos')
      .once('value');
    const poems = snapshot.val();
    if (poems) {
      runInAction(
        'fetchPoems',
        () => {
          this.list = Object.keys(poems).map(id => ({ id, ...poems[id] }));
        },
        this
      );
    }
  };

  @action get = id => this.list[id];

  selectPoem = async id => {
    const snapshot = await firebase
      .database()
      .ref('poems')
      .child(id)
      .once('value');

    runInAction(
      'selectPoem',
      () => {
        const poem = snapshot.val();
        if (poem) {
          const { title, authorName, isFavorite } = this.list.find(
            x => x.id === id
          );
          this.selectedPoem = {
            id,
            title,
            authorName,
            isFavorite,
            content: poem.lines.join('\n')
          };
        } else {
          this.selectedPoem = {
            id,
            content: 'None'
          };
        }
      },
      this
    );
  };

  @action
  favoritePoem = async id => {
    this.selectedPoem.isFavorite = true;
    await firebase
      .database()
      .ref('poemInfos')
      .child(id)
      .update({
        isFavorite: true
      });
  };

  @action
  unfavoritePoem = async id => {
    this.selectedPoem.isFavorite = false;
    await firebase
      .database()
      .ref('poemInfos')
      .child(id)
      .update({
        isFavorite: false
      });
  };
}

export default PoemStore;
