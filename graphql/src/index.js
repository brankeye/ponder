import { ApolloServer } from 'apollo-server';
import config from '@@config';
import schema from './schema';
import createContext from './context';

const server = new ApolloServer({
  schema,
  context: ({ req }) =>
    createContext({
      ...config,
      authorization: req.headers.authorization,
    }),
  introspection: true,
  playground: config.prod
    ? false
    : {
        settings: {
          'editor.theme': 'dark',
          'editor.cursorShape': 'line',
          'editor.fontSize': 12,
        },
      },
});

server.listen(config.port, config.host, err => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening at http://${config.host}:${config.port}`);
});
