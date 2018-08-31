import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import config from '@@config';
import schema from './schema';
import getContext from './context';

const makeGraphqlExpress = () =>
  graphqlExpress(req => ({
    schema,
    context: getContext({
      ...config,
      authorization: req.headers.authorization,
      clientId: req.headers['client-id'],
    }),
  }));

const app = express();
app.use(bodyParser.json());
app.use('/graphql', makeGraphqlExpress());

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    passHeader: `'Client-Id': '${config.clientId}'`,
  })
);

if (config.dev) {
  app.use('/graphqlMocked', makeGraphqlExpress());
  app.use(
    '/graphiqlMocked',
    graphiqlExpress({
      endpointURL: '/graphqlMocked',
    })
  );
}

app.use(
  (req, res, next) =>
    req.method === 'GET' && req.path.indexOf('graph') < 0
      ? res.redirect('/graphiql')
      : next()
);

app.get('/', (req, res) => {
  res.redirect('/graphiql');
});

app.listen(config.port, config.host, err => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening at http://${config.host}:${config.port}`);
});
