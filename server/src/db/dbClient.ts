import { MongoClient, Db } from "mongodb";
import config = require("../.config")

class DBClient {
    public db: Db;
    public mongoClient: MongoClient
    public connect()
    {
        MongoClient.connect(config.databaseURL, { useUnifiedTopology: true })
        .then(function (mongoClient) {
            this.db = mongoClient.db(config.databaseName)
            this.mongoClient = mongoClient; 
        })
        .catch(function(err) {
            console.log(err)
            process.exit(1)
        })
    }
}

export = new DBClient();