import { User } from '../../models';

export default {
  create: () => ({
    get: id => User.query().findById(id),

    getByClientId: clientId => User.query().findOne('client_id', clientId),

    insert: user =>
      User.query()
        .insert(user)
        .returning('*'),

    updateSettings: (id, settings) =>
      User.query().patchAndFetchById(id, settings),
  }),
};
