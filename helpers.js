

module.exports = {
    Mongo: {
        findOne: function (options) {
            MongoClient.connect("mongodb://localhost:27017/" + options.db, function (err, db) {
                if (err)
                    options.onFail(err);
                else {

                    var col = db.collection(options.collection);
                    var item = users.find(options.query).first();
                    db.close();

                    if (item && item != null)
                        options.onSuccess(item);
                    else
                        options.onFail();
                }
            });
        }
    }
};