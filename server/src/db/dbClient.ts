import { MongoClient, Db } from "mongodb";
import config = require("../.config")

class DBClient {
    public static db: Db;
    public static mongoClient: MongoClient

    public static connect()
    {
        MongoClient.connect(config.databaseURL, { useUnifiedTopology: true })
        .then(function (mongoClient) {
            DBClient.db = mongoClient.db(config.databaseName)
            DBClient.mongoClient = mongoClient; 
        })
        .catch(function(err) {
            console.log(err)
            process.exit(1)
        })
    }
}

export { DBClient }