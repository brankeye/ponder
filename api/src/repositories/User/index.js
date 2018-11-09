import { User } from 'database/models';

export default {
  create: () => ({
    get: id => User.query().findById(id),

    getByClientId: clientId => User.query().findOne('client_id', clientId),

    insert: user =>
      User.query()
        .insert(user)
        .returning('*'),

    updateTheme: (id, theme) => User.query().patchAndFetchById(id, { theme }),
  }),
};
