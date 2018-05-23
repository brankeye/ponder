import { User } from '@@database';
import { authenticate } from '@@utils/authentication';
import { format } from 'date-fns';
import uuid from 'uuid/v4';

const routes = {
  getUser: {
    method: 'GET',
    route: '/user',
    handler: async ({ context: { oauth_id } }, res) => {
      const { user_id } = await authenticate(oauth_id);
      return User.query()
        .findById(user_id)
        .then(data => res.json(data));
    },
  },
  registerUser: {
    method: 'POST',
    route: '/user',
    handler: async ({ context: { id, email } = {} }, res) => {
      const user = await User.query().findOne('oauth_id', id);
      return !user
        ? User.query()
            .insert({
              id: uuid(),
              oauth_id: id,
              email,
              viewed_at: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
            })
            .then(data => res.json(data))
        : res.sendStatus(200);
    },
  },
};

export default routes;
