import express from 'express';
import bodyParser from 'body-parser';
import boolParser from 'express-query-boolean';
import asyncHandler from 'express-async-handler';
import config from '@@config';
import routes from '@@routes';
import database from '@@database';
database.setup();
import rp from 'request-promise';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(boolParser());

app.use(
  asyncHandler(async (req, res, next) => {
    req.context = {};
    const auth = req.headers.authorization;
    if (auth) {
      const { provider, token } = JSON.parse(
        Buffer(auth, 'base64').toString('ascii')
      );
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
          req.context.oauth_id = id;
          req.context.name = name;
          req.context.email = email;
        }
      }
    }
    next();
  })
);

routes.map(({ method, route, handler }) => {
  const httpMethod = method.toLowerCase();
  const cleanedRoute = route.startsWith('/') ? route : `/${route}`;
  const apiRoute = '/api' + cleanedRoute;
  app[httpMethod](apiRoute, asyncHandler(handler));
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong',
    error: err,
  });
});

app.listen(config.port, config.host, err => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening at http://${config.host}:${config.port}`);
});
