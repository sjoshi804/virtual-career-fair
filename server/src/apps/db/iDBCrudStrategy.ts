import DBClient = require("./dbClient")
interface IDBCrudStrategy
{
    create(): boolean;
    update(filterQuery: any, updateQuery: any): boolean;
    findOne(query: any): any;
    findMany(query: any): Array<any>;
    deleteOne(filterQuery: any): boolean;
    deleteMany(filterQuery: any): boolean;
}

export { IDBCrudStrategy };