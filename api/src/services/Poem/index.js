// @flow

import { Poem, PoemInfo } from 'database';

class PoemService {
  get = ({ id }: { id: string }) => Poem.query().findById(id);

  getInfo = ({ id }: { id: string }) => PoemInfo.query().findById(id);
}

export default PoemService;
