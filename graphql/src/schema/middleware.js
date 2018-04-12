import { addMiddleware } from 'graphql-add-middleware';
import getFieldNames from 'graphql-list-fields';

const sqlMiddleware = {
  types: ['Query', 'Mutation'],
  handler: async (root, args, context, info, next) => {
    const requestedFields = getFieldNames(info);
    //console.log('Requested fields: ', requestedFields.toString());
    context.requestedFields = requestedFields;
    return await next();
  },
};

const list = [sqlMiddleware];

export const addMiddlewareToSchema = schema => {
  list.map(mw => mw.types.map(type => addMiddleware(schema, type, mw.handler)));
};
