var MongoClient = require("mongodb").MongoClient;
var uri = "mongodb://localhost:27017";

let insert = (database, data) => {
  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
    if (err) {
      console.log(err);
    } else {
      const db = client.db("gene");
      var collection = db.collection(database);
      collection.insertMany(data);
      client.close();
    }
  });
};

module.exports = {
  insert: insert
};
