import { User } from 'database';
import rp from 'request-promise';
import config from 'config';
import uuid from 'uuid/v4';

export const parseAuth = authorization =>
  JSON.parse(Buffer(authorization, 'base64').toString('ascii'));

export const socialLogin = async ({ provider, token }) => {
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

export const authenticate = async ({ clientId, authorization }) => {
  if (config.dev && clientId) {
    const user = await User.query().findOne('client_id', clientId);
    if (!user) {
      return User.query()
        .insert({
          id: uuid(),
          client_id: clientId,
          anonymous: true,
        })
        .returning('*');
    }
    return { user };
  } else if (authorization) {
    const { provider, token, clientId } = authorization;
    if (token) {
      const { oauthId } = await socialLogin({ provider, token });
      const user = await User.query().findOne('oauth_id', oauthId);
      return { user };
    } else if (clientId) {
      const user = await User.query().findOne('client_id', clientId);
      return { user };
    } else {
      throw new Error('Unknown client.');
    }
  }
};
