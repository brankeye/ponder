import { addMiddleware } from 'graphql-add-middleware';
import getFieldNames from 'graphql-list-fields';

const paginationMiddleware = {
  types: ['Query'],
  handler: async (root, args, context, info, next) => {
    if (info.returnType.toString().endsWith('Connection')) {
      const paginationFieldNames = getFieldNames(info) || [];
      if (paginationFieldNames.includes('pageInfo.hasNextPage')) {
        args.hasNextPage = true;
      }
      if (paginationFieldNames.includes('pageInfo.hasPreviousPage')) {
        args.hasPreviousPage = true;
      }
    }
    return await next();
  },
};

const list = [paginationMiddleware];

export const addMiddlewareToSchema = schema => {
  list.map(mw => mw.types.map(type => addMiddleware(schema, type, mw.handler)));
};
