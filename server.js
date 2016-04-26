'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Hoek = require('hoek');

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

// Add Views
server.views({
    engines: {
        html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views',
    layoutPath: 'layouts',
    helpersPath: 'helpers',
    layout: 'default'
});

// Add Assets route
server.route({
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
        directory: {
            path: 'assets'
        }
    }
});

// Index route
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index', {
            title: 'My home page',
            //scripts: ['teste1.js', 'teste2.js'],
            //styles: ['style1.css', 'style2.css']
        });
    }
});

// Add the hello route
server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {

        return reply('hello world');
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});