import { QueryBuilder } from 'objection';
import { decodeCursor } from 'utils/pagination';

class ExtendedQueryBuilder extends QueryBuilder {
  paginate = ({ column, first, last, after, before }) => {
    first = first ? parseInt(first) : first;
    last = last ? parseInt(last) : last;
    if (first && first <= 0 && (!last || last <= 0)) {
      throw new Error("Argument 'first' must not be less than zero.");
    } else if (last && last <= 0 && (!first || first <= 0)) {
      throw new Error("Argument 'last' must not be less than zero.");
    }

    const cursorId = before
      ? decodeCursor(before)
      : after
        ? decodeCursor(after)
        : undefined;

    let query = this;
    if (first) {
      first += 2;
      if (cursorId) {
        query = query.where(column, '<=', cursorId);
      }
      return query.limit(first);
    } else {
      last += 2;
      if (cursorId) {
        query = query.where(column, '>=', cursorId);
      }
      return query.limit(last);
    }
  };
}

export default ExtendedQueryBuilder;
