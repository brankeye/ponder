import express from 'express';
import bodyParser from 'body-parser';
import boolParser from 'express-query-boolean';
import asyncHandler from 'express-async-handler';

export default {
  create: ({ host, port, routes, context }) => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(boolParser());

    app.get('/', (req, res) => res.sendStatus(200));

    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({
        message: 'Something went wrong',
        error: err,
      });
    });

    routes.map(({ method, route, handler }) => {
      const httpMethod = method.toLowerCase();
      app[httpMethod](
        route,
        asyncHandler(async (req, res, next) => {
          console.log('Context fn: ', context);
          const ctx = await Promise.resolve(context({ req, res }));
          console.log('Context: ', ctx);
          return Promise.resolve(handler(req, res, ctx)).catch(next);
        })
      );
    });

    const listen = () =>
      app.listen(port, host, err => {
        if (err) {
          console.error(err);
        }
        console.log(`Listening at http://${host}:${port}`);
      });

    return {
      listen,
    };
  },
};
