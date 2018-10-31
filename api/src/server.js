import express from 'express';
import asyncHandler from 'express-async-handler';

export default {
  create: ({ host, port, use, routes, context }) => {
    const app = express();

    if (use && use.length > 0) {
      use.map(x => app.use(x));
    }

    routes.map(({ method, route, handler, before, after }) => {
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
