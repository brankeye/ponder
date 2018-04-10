import { Model as BaseModel } from 'objection';
import QueryBuilder from './queryBuilder';

class Model extends BaseModel {
  static get QueryBuilder() {
    return QueryBuilder;
  }
}

export { Model };
