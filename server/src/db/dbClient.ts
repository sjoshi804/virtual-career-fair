import { MongoClient, Db } from "mongodb";
import config = require("../.config")

class DBClient {
    public static db: Db;
    private static mongoClient: MongoClient

    public static async connect(databaseURL = config.databaseURL, databaseName = config.databaseName)
    {   
        DBClient.mongoClient = await MongoClient.connect(config.databaseURL, { useUnifiedTopology: true });
        DBClient.db = DBClient.mongoClient.db(config.databaseName);
    }

    public static close()
    {
        DBClient.mongoClient.close();
    }
}

export { DBClient }