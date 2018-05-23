import { User } from '@@database';

export const authenticate = async oauth_id => {
  if (!oauth_id) {
    throw new Error('Missing authentication.');
  }
  const { id } =
    (await User.query()
      .select('id')
      .findOne('oauth_id', oauth_id)) || {};
  if (!id) {
    throw new Error('Failed authentication.');
  }
  return {
    user_id: id,
  };
};
