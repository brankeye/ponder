import { action, observable, computed, runInAction } from 'mobx';
import uuid from 'uuid';
import { firebase } from 'utilities';
//import remotedev from 'mobx-remotedev';

//@remotedev({ name: 'Poems' })
class UserStore {
  constructor(rs) {
    this.rootStore = rs;
  }

  @observable id = '1a8e1ef5-daa7-410b-9f02-be0354b8308e';

  @observable favoriteAuthors = [];

  @observable favoritePoems = [];

  getFavoriteAuthors = async () => {
    const snapshot = await firebase
      .database()
      .ref('users')
      .child(this.id)
      .child('favoriteAuthors')
      .once('value');

    runInAction(
      'getFavoriteAuthors',
      () => {
        const favorites = snapshot.val();
        if (favorites) {
          this.favoriteAuthors = Object.keys(favorites).map(id => id);
        }
      },
      this
    );

    return this.favoriteAuthors;
  };

  getFavoritePoems = async () => {
    const snapshot = await firebase
      .database()
      .ref('users')
      .child(this.id)
      .child('favoritePoems')
      .once('value');

    runInAction(
      'getFavoritePoems',
      () => {
        const favorites = snapshot.val();
        if (favorites) {
          this.favoritePoems = Object.keys(favorites).map(id => id);
        }
      },
      this
    );

    return this.favoritePoems;
  };

  @action
  favoritePoem = async id => {
    await firebase
      .database()
      .ref('users')
      .child(this.id)
      .child('favoritePoems')
      .update({
        [id]: true
      });
  };

  @action
  unfavoritePoem = async id => {
    await firebase
      .database()
      .ref('users')
      .child(this.id)
      .child('favoritePoems')
      .update({
        [id]: null
      });
  };
}

export default UserStore;
