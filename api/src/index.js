import express from 'express';
import Context from 'context';
import Routers from 'routers';
import database from 'database';
import config from 'config';

database.init();
const app = express();
const context = Context.create();
Routers.init(app, context);
Routers.listen(app, config);
