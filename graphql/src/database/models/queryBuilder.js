import { QueryBuilder } from 'objection';

class ExtendedQueryBuilder extends QueryBuilder {
  filter = filters => {
    let query = this;
    Object.entries(filters).map(([key, filter]) => {
      if (filter) {
        query = this[key](...filter);
      }
    });
    return query;
  };
}

export default ExtendedQueryBuilder;
