import { User } from '@@database';
import { socialLogin } from '@@utils';
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
  signInAnonymous: {
    method: 'POST',
    route: '/user/anon',
    handler: async ({ body: { clientId } }, res) => {
      const user = await User.query().findOne('client_id', clientId);
      if (user) {
        console.log('Anon user: ', user);
        return user;
      }

      const newUser = await User.query()
        .insert({
          id: uuid(),
          client_id: clientId,
          anonymous: true,
        })
        .returning('*');
      console.log('Anon user: ', newUser);
      return res.json(newUser);
    },
  },
  signInSocial: {
    method: 'POST',
    route: '/user/social',
    handler: async ({ clientId, provider, token }, res) => {
      const { email, oauthId } = await socialLogin({ provider, token });
      const user = await User.query().findOne('client_id', clientId);
      if (user) {
        if (user.anonymous) {
          const updatedUser = await User.query().patchAndFetchById(
            user.id,
            merge(user, {
              email,
              provider,
              oauth_id: oauthId,
              anonymous: false,
            })
          );
          console.log('Social user: ', updatedUser);
          return res.json(updatedUser);
        } else {
          console.log('Social user: ', user);
          return user;
        }
      } else {
        const newUser = await User.query()
          .insert({
            id: uuid(),
            client_id: clientId,
            email,
            provider,
            oauth_id: oauthId,
            anonymous: false,
          })
          .returning('*');
        console.log('Social user: ', newUser);
        return res.json(newUser);
      }
    },
  },
};

export default routes;
