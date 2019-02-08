import Middleware from './middleware';
import UserRouter from './users';
import AuthorRouter from './authors';
import PoemRouter from './poems';
import asyncHandler from 'express-async-handler';

export default {
  init: (app, context) => {
    const middleware = Middleware.create(context);
    const users = UserRouter.create(context);
    const authors = AuthorRouter.create(context);
    const poems = PoemRouter.create(context);

    app.use(middleware.parseJson);
    app.use(middleware.parseUrl);
    app.use(middleware.parseBool);
    app.use(middleware.requestState);
    app.use(asyncHandler(middleware.authorization));

    app.get('/api/user', asyncHandler(users.get));
    app.put('/api/user/settings', asyncHandler(users.updateSettings));

    app.get('/api/authors/discover', asyncHandler(authors.discover));
    app.get('/api/authors/search', asyncHandler(authors.search));
    app.get('/api/authors/library', asyncHandler(authors.library));
    app.get('/api/authors/recents', asyncHandler(authors.recents));
    app.get('/api/authors/:author_id/poems', asyncHandler(authors.poems));
    app.get('/api/authors/:author_id/info', asyncHandler(authors.info));
    app.get('/api/authors/:author_id', asyncHandler(authors.get));
    app.put('/api/authors/:author_id/view', asyncHandler(authors.updateView));

    app.get('/api/poems/discover', asyncHandler(poems.discover));
    app.get('/api/poems/search', asyncHandler(poems.search));
    app.get('/api/poems/library', asyncHandler(poems.library));
    app.get('/api/poems/recents', asyncHandler(poems.recents));
    app.get('/api/poems/:poem_id/info', asyncHandler(poems.info));
    app.get('/api/poems/:poem_id', asyncHandler(poems.get));
    app.put('/api/poems/:poem_id/library', asyncHandler(poems.updateLibrary));
    app.put('/api/poems/:poem_id/view', asyncHandler(poems.updateView));

    app.use(middleware.errors);
  },
  listen: (app, { port, host }) => {
    app.listen(port, host, err => {
      if (err) {
        console.error(err);
      }
      console.log(`Listening at http://${host}:${port}`);
    });
  },
};
