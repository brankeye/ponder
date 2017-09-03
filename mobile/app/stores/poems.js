import { action, observable } from "mobx";
import remotedev from "mobx-remotedev";
import config from "./config";

@remotedev(config)
class poems {
  @observable poem = {
    title: 'Bright star, would I were stedfast as thou art',
    author: 'John Keats',
    body: 'Bright star, would I were stedfast as thou art-' +
          'Not in lone splendour hung aloft the night' +
          'And watching, with eternal lids apart, ' +
          'Like nature\'s patient, sleepless Eremite,' +
          'The moving waters at their priestlike task ' +
          'Of pure ablution round earth\'s human shores,' +
          'Or gazing on the new soft-fallen mask' +
          'Of snow upon the mountains and the moors-' +
          'No- yet still stedfast, still unchangeable,' +
          'Pillow\'d upon my fair love\'s ripening breast,' +
          'To feel for ever its soft fall and swell,' +
          'Awake for ever in a sweet unrest,' +
          'Still, still to hear her tender-taken breath,' +
          'And so live ever- or else swoon to death.'
  }
}

const store = new poems();
export default store;
