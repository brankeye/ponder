import { User } from '@@database';
import { authenticate } from '@@utils/authentication';

const routes = {
  getUser: {
    method: 'GET',
    route: '/user',
    handler: async ({ context: { email, oauth_id } }, res) => {
      const { user_id } = await authenticate({ email, oauth_id });
      return User.query()
        .findById(user_id)
        .then(data => res.json(data));
    },
  },
};

export default routes;
