const Bcrypt = require('bcryptjs');
const Basic = require('hapi-auth-basic');
const Helpers = require('./helpers.js');

module.exports = {

    validateFunc: function (request, email, password, callback) {
        Helpers.Mongo.findOne({
            db: "profiler",
            collection: "users",
            query: { email: email },
            onSuccess: function (user) {
                Bcrypt.compare(password, user.password, (err, isValid) => {
                    callback(err, isValid, user);
                });
            },
            onFail: function (err) {
                callback(err, false, null);
            }
        })
    },

};

