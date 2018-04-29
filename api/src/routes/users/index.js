import { User } from '@@database';
import { authenticate } from '@@utils/authentication';

const routes = {
  getUser: {
    method: 'GET',
    route: '/user',
    handler: async ({ headers: { authorization } }, res) => {
      console.log({ authorization });
      const { user_id } = await authenticate(authorization);
      return User.query()
        .findById(user_id)
        .then(data => res.json(data));
    },
  },
};

export default routes;
