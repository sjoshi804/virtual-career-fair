import { MongoClient, Db } from "mongodb";
import config = require("../.config")

class DBClient {
    public static db: Db;
    public static mongoClient: MongoClient

    public static async connect()
    {   if (DBClient.db == undefined)
        {
            DBClient.mongoClient = await MongoClient.connect(config.databaseURL, { useUnifiedTopology: true });
            DBClient.db = DBClient.mongoClient.db(config.databaseName);
        }
    }

    public static close()
    {
        if (DBClient.mongoClient != undefined)
        {
            DBClient.mongoClient.close();
        }
    }
}

export { DBClient }