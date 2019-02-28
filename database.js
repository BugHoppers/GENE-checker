var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017"

let insert = (database, data) => {
    MongoClient.connect(url, function (err, client) {
        // if (err) throw err;
        const db = client.db("gene");
        var collection = db.collection(database);
        collection.insertMany(data);
        client.close();
    });
}

module.exports = {
    insert : insert
};