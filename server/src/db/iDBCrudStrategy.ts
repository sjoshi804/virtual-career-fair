import { ISerializable } from "./iSerializable";

interface IDBCrudStrategy<TSchema>
{
    save(object: ISerializable): Promise<boolean>;
    updateOne(filterQuery: any, updateQuery: any): Promise<boolean>;
    updateMany(filterQuery: any, updateQuery: any): Promise<boolean>;
    findOne(query: any): Promise<TSchema>;
    findMany(query: any): Promise<Array<TSchema>>;
    deleteOne(filter: any): Promise<boolean>;
    deleteMany(filter: any): Promise<boolean>;
}

export { IDBCrudStrategy };