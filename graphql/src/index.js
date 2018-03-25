import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import config from './server/config';
import getSchema from './model';
import context from './context';

const app = express();
app.use(bodyParser.json());
app.use('/graphql', graphqlExpress({ schema: getSchema(), context }));

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  })
);

if (config.dev) {
  app.use(
    '/graphqlMocked',
    graphqlExpress({ schema: getSchema({ enableMocks: true }), context })
  );
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
