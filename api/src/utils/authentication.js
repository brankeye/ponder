import { User } from '@@database';
import uuid from 'uuid/v4';

export const authenticate = async ({ email, oauth_id }) => {
  if (!oauth_id) {
    throw new Error('Missing authentication.');
  }
  const { id } =
    (await User.query()
      .select('id')
      .findOne('oauth_id', oauth_id)) || {};
  if (!id) {
    const userId = uuid();
    await User.query().insert({ id: userId, email, oauth_id });
    return {
      user_id: userId,
    };
  }
  return {
    user_id: id,
  };
};
