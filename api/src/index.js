import Server from './server';
import config from 'config';
import routes from 'routes';
import Context from 'context';
import bodyParser from 'body-parser';
import boolParser from 'express-query-boolean';
import database from 'database';
database.setup();

const { host, port } = config;

const errors = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong',
    error: err,
  });
};

const server = Server.create({
  host,
  port,
  use: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    boolParser(),
    errors,
  ],
  routes,
  context: Context.create,
});

server.listen();
