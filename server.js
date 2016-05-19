'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Hoek = require('hoek');
const NunjucksHapi = require('nunjucks-hapi');
const viewPath = Path.join(__dirname, 'views')
const env = NunjucksHapi.configure(viewPath);
const Routes = require('./routes.js');
const Auth = require('./authentication.js');

// do anything you want to the env here
env.addFilter('somefilter', function(str, count) {
  // return some string
});

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    port: Number(process.argv[2] || 9000),
    host: 'localhost'
});

server.register(require('vision'), (err) => {
    Hoek.assert(!err, err);
});
server.register(require('inert'), (err) => {
    Hoek.assert(!err, err);
});
server.register(require('hapi-auth-basic'), (err) => {
    server.auth.strategy('simple', 'basic', Auth);
});

// Add Views
server.views({
    engines: {
        html: NunjucksHapi
    },
    path: viewPath
});

// Add Assets route
server.route(Routes);

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});