import authors from './authors';
import poems from './poems';
import users from './users';

const list = [authors, poems, users];

const routes = [].concat(
  ...list.map(routeMap => {
    return Object.keys(routeMap).map(key => routeMap[key]);
  })
);

export default routes;
