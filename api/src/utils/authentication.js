import { User } from 'database';

const getClientId = auth =>
  auth ? Buffer.from(auth, 'base64').toString('ascii') : undefined;

export const authenticate = async auth => {
  const clientId = getClientId(auth);
  if (clientId) {
    const user = await User.query().findOne('client_id', clientId);
    return { user };
  } else {
    throw new Error('Unknown client.');
  }
};
