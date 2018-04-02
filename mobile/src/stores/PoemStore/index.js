import { action, observable, computed, runInAction } from 'mobx';
import uuid from 'uuid';
import remotedev from 'mobx-remotedev';
import client, { poemListQuery, poemQuery } from '@@graphql';

@remotedev({ name: 'Poems' })
class PoemStore {
  constructor(rs) {
    this.rootStore = rs;
  }

  @observable list = [];

  @observable selectedId = '';

  @observable selectedPoem = {};

  @action
  fetchPoems = async () => {
    const { data } = await client.query({ query: poemListQuery });
    runInAction(() => {
      this.list = data.poemList;
    }, this);
  };

  @action
  fetchSelectedPoem = async () => {
    const { data } = await client.query({
      query: poemQuery,
      variables: { id: this.selectedId },
    });
    console.log('Data: ', data);
    runInAction(() => {
      const poem = this.list.find(({ id }) => id === this.selectedId);
      this.selectedPoem = { ...poem, ...data.poem };
    }, this);
  };

  @action
  selectPoem = id => {
    this.selectedId = id;
  };
}

export default PoemStore;
