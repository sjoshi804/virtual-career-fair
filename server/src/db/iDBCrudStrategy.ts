import { ISerializable } from "./iSerializable";

interface IDBCrudStrategy
{
    save(object: ISerializable): Promise<boolean>;
    updateOne(filterQuery: any, updateQuery: any): Promise<boolean>;
    updateMany(filterQuery: any, updateQuery: any): Promise<boolean>;
    findOne<TSchema>(query: any): Promise<TSchema>;
    findMany<TSchema>(query: any): Promise<Array<TSchema>>;
    deleteOne(filter: any): Promise<boolean>;
    deleteMany(filter: any): Promise<boolean>;
}

export { IDBCrudStrategy };