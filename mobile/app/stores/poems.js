import { action, observable } from "mobx";
import remotedev from "mobx-remotedev";
import config from "./config";

@remotedev(config)
class poems {
  @observable poemList = [
    {
      title: 'Hyperion',
      author: 'John Keats',
      teaser: 'Deep in the shady sadness of a vale\nFar sunken from the healthy breath of morn...'
    },
    {
      title: 'The Road Not Taken',
      author: 'Robert Frost',
      teaser: 'Two roads diverged in a yellow wood,\nAnd sorry I could not travel both...'
    },
    {
      title: 'Ozymandias',
      author: 'Percy Bysshe Shelley',
      teaser: 'I met a traveller from an antique land\nWho said: `Two vast and trunkless legs of stone\nStand in the desert...'
    }
  ];

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
  }
}

const store = new poems();
export default store;
