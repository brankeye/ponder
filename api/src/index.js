import express from 'express';
import bodyParser from 'body-parser';
import boolParser from 'express-query-boolean';
import asyncHandler from 'express-async-handler';
import { merge } from 'ramda';
import config from 'config';
import routes from 'routes';
import database from 'database';
import { authenticate } from 'utils';
import createContext from 'context';
database.setup();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(boolParser());

app.use(
  asyncHandler(async (req, res, next) => {
    req.context = createContext();
    if (req.headers.authorization) {
      const authorization = req.headers.authorization;
      req.context = merge(req.context, { authorization });
    }
    next();
  })
);

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.context;
  if (authorization) {
    const context = await authenticate(authorization);
    req.context = merge(req.context || {}, context);
  }
  next();
};

routes.map(({ method, route, handler, auth }) => {
  const httpMethod = method.toLowerCase();
  const cleanedRoute = route.startsWith('/') ? route : `/${route}`;
  const apiRoute = '/api' + cleanedRoute;
  if (auth) {
    app.use(apiRoute, asyncHandler(authMiddleware));
  }
  app[httpMethod](
    apiRoute,
    asyncHandler((req, res, next, ...args) => {
      const context = createContext();
      const fnReturn = handler(context, req, res, next, ...args);
      return Promise.resolve(fnReturn).catch(next);
    })
  );
});

app.get('/', (req, res) => res.sendStatus(200));

app.use((err, req, res, next) => {
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
