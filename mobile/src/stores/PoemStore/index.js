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
  get favorites() {
    return observable(this.list.filter(x => x.isFavorite));
  }

  fetchPoems = async () => {
    const favoriteAuthors = await this.rootStore().user.getFavoriteAuthors();
    const favoritePoems = await this.rootStore().user.getFavoritePoems();
    const snapshot = await firebase
      .database()
      .ref('poemInfos')
      .once('value');
    const poems = snapshot.val();
    if (poems) {
      runInAction(
        'fetchPoems',
        () => {
          this.list = observable(
            Object.keys(poems).map(id => {
              const isFavorite = favoritePoems.includes(id);
              return observable({ id, ...poems[id], isFavorite });
            })
          );
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
    const favPoem = this.list.find(x => x.id === id);
    if (favPoem) {
      favPoem.isFavorite = true;
    }
    await this.rootStore().user.favoritePoem(id);
  };

  @action
  unfavoritePoem = async id => {
    this.selectedPoem.isFavorite = false;
    const favPoem = this.list.find(x => x.id === id);
    if (favPoem) {
      favPoem.isFavorite = false;
    }
    await this.rootStore().user.unfavoritePoem(id);
  };
}

export default PoemStore;
