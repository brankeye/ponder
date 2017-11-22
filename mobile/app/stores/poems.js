import { action, observable, computed } from "mobx";
import config from "./config";
import uuid from 'uuid';

const initialId = uuid.v4();

class poems {
  @observable selectedPoemId = initialId;

  @observable poemList = {};

  @computed get poemArray() {
    return observable(Object.keys(this.poemList).map(id => {
      return observable({
        id,
        ...this.poemList[id]
      });
    }));
  };

  @observable poem = {
    title: 'Bright star, would I were stedfast as thou art',
    author: 'John Keats',
    body: 'Bright star, would I were stedfast as thou art-\n' +
          'Not in lone splendour hung aloft the night\n' +
          'And watching, with eternal lids apart,\n' +
          'Like nature\'s patient, sleepless Eremite,\n' +
          'The moving waters at their priestlike task\n' +
          'Of pure ablution round earth\'s human shores,\n' +
          'Or gazing on the new soft-fallen mask\n' +
          'Of snow upon the mountains and the moors-\n' +
          'No- yet still stedfast, still unchangeable,\n' +
          'Pillow\'d upon my fair love\'s ripening breast,\n' +
          'To feel for ever its soft fall and swell,\n' +
          'Awake for ever in a sweet unrest,\n' +
          'Still, still to hear her tender-taken breath,\n' +
          'And so live ever- or else swoon to death.'
  };

  @action updatePoemList = poems => {
    this.selectPoem(Object.keys(poems)[0]);
    this.poemList = poems;
  }

  @action get = id => this.poemList[id];

  @computed get selectedPoem() {
    const id = this.selectedPoemId;
    return ({
      id,
      ...this.poemList[this.selectedPoemId]
    });
  };

  @action selectPoem = id => this.selectedPoemId = id;
}

const store = new poems();
export default store;
