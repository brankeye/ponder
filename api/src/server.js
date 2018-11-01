import express from 'express';
import asyncHandler from 'express-async-handler';

const handleUseMiddleware = (app, use) => {
  if (use && use.length > 0) {
    use.map(x => app.use(x));
  }
};

const handleRoutes = (app, context, routes) => {
  for (let i = 0; i < routes.length; i++) {
    handleRoute(app, context, routes[i]);
  }
};

const handleRoute = (app, context, { routes, before, after }) => {
  routes.map(({ method, route, handler }) => {
    const httpMethod = method.toLowerCase();
    app[httpMethod](
      route,
      asyncHandler(async (req, res, next) => {
        const ctx = await Promise.resolve(context({ req, res }));
        if (before && before.length) {
          for (let i = 0; i < before.length; i++) {
            const beforeFn = before[i];
            await Promise.resolve(beforeFn(req, res, ctx)).catch(next);
          }
        }
        const result = await Promise.resolve(handler(req, res, ctx)).catch(
          next
        );
        if (after && after.length) {
          for (let i = 0; i < after.length; i++) {
            const afterFn = after[i];
            await Promise.resolve(afterFn(req, res, ctx)).catch(next);
          }
        }
        return result;
      })
    );
  });
};

export default {
  create: ({ host, port, use, routes, context }) => {
    const app = express();

    handleUseMiddleware(app, use);
    handleRoutes(app, context, routes);

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
