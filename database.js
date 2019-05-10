var MongoClient = require("mongodb").MongoClient;
var uri = "mongodb://localhost:27017";

let insert = (database, data) => {
  MongoClient.connect(uri, { useNewUrlParser: true }, function (err, client) {
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

let readGenes = (database, cb) => {
  MongoClient.connect(uri, { useNewUrlParser: true }, function (err, client) {
    if (err) {
      console.log(err);
    } else {
      const db = client.db("gene");
      var collection = db.collection(database);
      collection.find({}).toArray(function(err, result) {
        if (err) throw err;
        // console.log(result);
        client.close();
        cb(result);
      });
    }
  });
}

// readGenes("complete_gene",(res)=>console.log(res));

module.exports = {
  insert: insert,
  readGenes
};
