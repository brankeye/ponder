import Server from './server';
import config from 'config';
import routes from 'routes';
import Context from 'context';
import database from 'data';
database.setup();

const { host, port } = config;

const server = Server.create({
  host,
  port,
  routes,
  context: Context.create,
});

server.listen();
