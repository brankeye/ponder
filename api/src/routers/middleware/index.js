import bodyParser from 'body-parser';
import boolParser from 'express-query-boolean';

export default {
  create: ({ UserService }) => ({
    parseJson: bodyParser.json(),
    parseUrl: bodyParser.urlencoded({ extended: false }),
    parseBool: boolParser(),
    requestState: (req, res, next) => {
      if (!req.state) {
        req.state = {};
      }
      next();
    },
    authorization: async ({ state, headers: { authorization } }, res, next) => {
      if (authorization) {
        const clientId = Buffer.from(authorization, 'base64').toString();
        if (clientId) {
          state.clientId = clientId;
          const user = await UserService.getByClientId(clientId);
          if (user) {
            state.user = user;
          }
        }
      }
      next();
    },
    errors: (err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({
        message: 'Something went wrong',
        error: err,
      });
    },
  }),
};
