import { User } from 'database';
import { socialLogin, notify } from 'utils';
import uuid from 'uuid/v4';
import { merge } from 'ramda';

const routes = {
  getUser: {
    method: 'GET',
    route: '/user',
    auth: true,
    handler: (_, { context: { user } }, res) => {
      return res.json(user);
    },
  },
  signInAnonymous: {
    method: 'POST',
    route: '/user/anon',
    handler: async (_, { body: { clientId, ...body } }, res) => {
      const user = await User.query().findOne('client_id', clientId);
      if (user) {
        console.log('Anon user: ', user);
        return res.json(user);
      }
      console.log('Body: ', body);
      const newUser = await User.query()
        .insert({
          id: uuid(),
          client_id: clientId,
          anonymous: true,
          ...body,
        })
        .returning('*');
      if (newUser.notify) {
        const h = newUser.notify_time.split(':')[0];
        const m = newUser.notify_time.split(':')[1];
        notify({
          userId: newUser.id,
          pushToken: newUser.push_token,
          time: `00 ${m} ${h} * * *`,
          timeZone: newUser.time_zone,
        });
      }
      console.log('Anon user: ', newUser);
      return res.json(newUser);
    },
  },
  signInSocial: {
    method: 'POST',
    route: '/user/social',
    handler: async (
      _,
      { body: { clientId, provider, oauthToken, ...body } },
      res
    ) => {
      const { email, oauthId } = await socialLogin({ provider, oauthToken });
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
          return res.json(user);
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
            ...body,
          })
          .returning('*');
        console.log('Social user: ', newUser);
        return res.json(newUser);
      }
    },
  },
  updateSettings: {
    method: 'PUT',
    route: '/user/settings',
    auth: true,
    handler: ({ UserService }, { body, context: { user } }, res) =>
      UserService.updateSettings({ id: user.id, settings: body }).then(data =>
        res.json(data)
      ),
  },
};

export default routes;
