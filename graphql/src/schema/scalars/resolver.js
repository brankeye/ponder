import { GraphQLScalarType } from 'graphql';
import format from 'date-fns/format';
import { pipe, prop } from 'ramda';

const dateFormat = date => {
  if (!isNaN(date)) date = parseInt(date, 10) * 1000;
  return format(date, 'YYYY-MM-DDTHH:mm:ss');
};

const resolver = {
  Date: new GraphQLScalarType({
    name: 'Date',
    serialize: dateFormat,
    parseValue: dateFormat,
    parseLiteral: pipe(prop('value'), dateFormat),
  }),
};

export default resolver;
