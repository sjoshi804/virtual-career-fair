import DBClient = require("./dbClient")
interface IDBCrudStrategy
{
    save(object: any): Promise<boolean>;
    updateOne(filterQuery: any, updateQuery: any): Promise<boolean>;
    updateMany(filterQuery: any, updateQuery: any): Promise<boolean>;
    findOne(query: any): Promise<any>;
    findMany(query: any): Promise<Array<any>>;
    deleteOne(filter: any): Promise<boolean>;
    deleteMany(filter: any): Promise<boolean>;
}

export { IDBCrudStrategy };