import { User } from '@@database';

export const authenticate = async authToken => {
  if (!authToken) {
    throw new Error('Missing authentication.');
  }
  const { id } = await User.query()
    .select('id')
    .findOne('oauth_id', authToken);
  return {
    user_id: id,
  };
};
