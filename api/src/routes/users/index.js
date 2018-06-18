import { User } from '@@database';
import uuid from 'uuid/v4';
import { merge } from 'ramda';

const routes = {
  getUser: {
    method: 'GET',
    route: '/user',
    auth: true,
    handler: ({ context: { user } }, res) => {
      return res.json(user);
    },
  },
  registerAnonymous: {
    method: 'POST',
    route: '/user',
    handler: async ({ body: { clientId, timeZone } }, res) => {
      const newUser = await User.query()
        .insert({
          id: uuid(),
          client_id: clientId,
          anonymous: true,
          time_zone: timeZone,
        })
        .returning('*');
      console.log('New User: ', newUser);
      return res.json(newUser);
    },
  },
  registerUser: {
    method: 'PUT',
    route: '/user',
    handler: async ({ context: { user, authorization } }, res) => {
      const { email, oauthId } = authorization;
      const updatedUser = await User.query().patchAndFetchById(
        user.id,
        merge(user, { email, oauth_id: oauthId })
      );
      console.log('Updated user: ', updatedUser);
      return res.json(updatedUser);
    },
  },
};

export default routes;
