module.exports = [
    {
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: {
                path: 'assets'
            }
        }
    }, {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.view('home');
        }
    }, {
        method: 'GET',
        path: '/{param*}',
        config: {
            //auth: 'simple',
            handler: function (request, reply) {
                var viewName = request.url.path.substring(1);
                if (viewName.charAt(viewName.length - 1) === '/')
                    viewName += "index";
                reply.view(viewName);
            }
        }
    }
];