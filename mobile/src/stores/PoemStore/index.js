import { action, observable, computed, runInAction } from 'mobx';
import uuid from 'uuid';
import remotedev from 'mobx-remotedev';
import client, { poemListQuery, poemLibraryQuery, poemQuery } from '@@graphql';

@remotedev({ name: 'Poems' })
class PoemStore {
  constructor(rs) {
    this.rootStore = rs;
  }

  @observable loading = true;

  @observable list = [];

  @observable library = [];

  @observable selectedPoem = {};

  @action
  fetchPoems = async () => {
    const { data } = await client.query({
      query: poemListQuery,
      variables: { first: 15 },
    });
    runInAction(() => {
      this.list = data.poemList.edges.map(({ node }) => ({ ...node }));
    }, this);
  };

  fetchLibrary = async () => {
    const {
      data: { poemLibrary },
    } = await client.query({
      query: poemLibraryQuery,
      variables: { first: 15 },
    });
    runInAction(() => {
      this.library = poemLibrary;
    }, this);
  };

  @action
  selectPoem = async selectedId => {
    runInAction(() => {
      this.loading = true;
    });
    const {
      data: { poem },
    } = await client.query({
      query: poemQuery,
      variables: {
        id: selectedId,
      },
    });
    runInAction(() => {
      this.selectedPoem = { ...poem };
      console.log(this.selectedPoem);
      this.loading = false;
    }, this);
  };

  @action
  changePoemBookmark = id => {
    const poem = this.list.find(x => x.id === id);
    poem && (poem.isBookmarked = !poem.isBookmarked);
    const lib = this.library.find(x => x.id === id);
    lib && (lib.isBookmarked = !lib.isBookmarked);
  };
}

export default PoemStore;
