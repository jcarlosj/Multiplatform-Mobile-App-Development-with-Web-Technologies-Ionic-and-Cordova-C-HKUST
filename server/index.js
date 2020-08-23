const
    data = require( './data/dbs' ),
    path = require( 'path' ),
    express = require( 'express' ),
    jsonServer = require( 'json-server' ),
    server = jsonServer .create(),
    router = jsonServer .router( data() ),
    middlewares = jsonServer .defaults(),
    cors = require( 'cors' ),
    port = 5000;      // Important configure the same port

server .use( cors() );
server .use( express .static( path .join( __dirname, 'public' ) ) );
server .use( middlewares );
server .use( router );

server .listen( port, () => {
    console .log( `JSON Server is running at port ${ port }` );
});
