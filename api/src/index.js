import express from 'express';
import bodyParser from 'body-parser';
import boolParser from 'express-query-boolean';
import asyncHandler from 'express-async-handler';
import config from '@@config';
import routes from '@@routes';
import database from '@@database';
database.setup();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(boolParser());

routes.map(({ method, route, handler }) => {
  const httpMethod = method.toLowerCase();
  const cleanedRoute = route.startsWith('/') ? route : `/${route}`;
  const apiRoute = '/api' + cleanedRoute;
  app[httpMethod](apiRoute, asyncHandler(handler));
});

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
