import { User } from '@@database';
import uuid from 'uuid/v4';
import rp from 'request-promise';
import config from '@@config';

const socialLogin = async ({ provider, token }) => {
  switch (provider) {
    case 'facebook': {
      const { id, name, email } =
        (await rp({
          uri: `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`,
        }).json()) || {};
      console.log(`fb, id: ${id}, name: ${name}, email: ${email}`);
      if (!id) {
        throw new Error('Failed authentication.');
      }
      return {
        oauthId: id,
        name,
        email,
      };
    }
  }
};

export const authenticate = async ({ authorization }) => {
  if (authorization) {
    const { provider, token, clientId } = JSON.parse(
      Buffer(authorization, 'base64').toString('ascii')
    );
    if (token) {
      const { oauthId } = await socialLogin({ provider, token });
      const user = await User.query().findOne('oauth_id', oauthId);
      return { user };
    } else if (clientId) {
      console.log('Client id: ', clientId);
      const user = await User.query().findOne('client_id', clientId);
      if (!user) {
        const newUser = await User.query()
          .insert({ id: uuid(), client_id: clientId, anonymous: true })
          .returning('*');
        return {
          user: newUser,
        };
      }
      return { user };
    } else {
      throw new Error('Unknown client.');
    }
  } else if (config.dev) {
    const user = await User.query().findOne('client_id', 'default');
    console.log('User: ', user);
    if (!user) {
      const newUser = await User.query()
        .insert({ id: uuid(), client_id: 'default', anonymous: true })
        .returning('*');
      console.log('New User: ', newUser);
      return {
        user: newUser,
      };
    }
    return { user };
  }
};
