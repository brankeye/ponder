import express from 'express';
import bodyParser from 'body-parser';
import {
    graphqlExpress,
    graphiqlExpress,
    graphqlConnect,
    graphiqlConnect
} from 'apollo-server-express';
import connect from 'connect';
import http from 'http';
import config from './server/config';
import schema from './model/schema';

const setupExpress = () => {
    const app = express();

    app.use( '/graphql', bodyParser.json(), graphqlExpress( { schema } ) );
    app.use(
        '/graphiql',
        graphiqlExpress( {
            'endpointURL': '/graphql'
        } )
    );

    app.listen( config.port );
};

const setupServer = () => {
    const app = connect();

    app.use( '/graphql', bodyParser.json() );
    app.use( '/graphql', graphqlConnect( { schema } ) );
    app.use(
        '/graphiql',
        graphiqlConnect( {
            'endpointURL': '/graphql'
        } )
    );

    http.createServer( app ).listen( config.port );
};

const start = () => {
    setupExpress();
    setupServer();
};

start();
