import { DBClient } from './dbClient';
import { IDBCrudStrategy } from './iDBCrudStrategy';
import { ISerializable } from './iSerializable';

abstract class AbstractDefaultDBCrudStrategy<TSchema> implements IDBCrudStrategy<TSchema>
{
    public abstract getCollectionName(): string;

    public async save(object): Promise<boolean>
    {
        try
        {
            await DBClient.db.collection(this.getCollectionName()).insertOne(object);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async updateOne(filterQuery: any, updateQuery: any): Promise<boolean> 
    {
        try
        {
            await DBClient.db.collection(this.getCollectionName()).updateOne(filterQuery, updateQuery);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async updateMany(filterQuery: any, updateQuery: any): Promise<boolean> 
    {
        try
        {
            await DBClient.db.collection(this.getCollectionName()).updateMany(filterQuery, updateQuery);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async findOne(query: any): Promise<TSchema> 
    {
        try
        {
            return await DBClient.db.collection(this.getCollectionName()).findOne<TSchema>(query);
        }
        catch
        {
            return null;
        }
    }

    public async findMany(query: any): Promise<TSchema[]> 
    {
        try
        {
            var cursor = DBClient.db.collection(this.getCollectionName()).find<TSchema>(query);
            var results = new Array<TSchema>();
            await cursor.forEach(element => {
                results.push(element);
            });
            return results;
        }
        catch
        {
            return null;
        }
    }

    public async deleteOne(filter: any): Promise<boolean> 
    {
        try
        {
            await DBClient.db.collection(this.getCollectionName()).deleteOne(filter)
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async deleteMany(filter: any): Promise<boolean> 
    {
        try
        {
            await DBClient.db.collection(this.getCollectionName()).deleteMany(filter);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public count(filter: any): number
    {
        var num;
        num = DBClient.db.collection(this.getCollectionName()).countDocuments(filter);
        return num;
    }
 
}

export { AbstractDefaultDBCrudStrategy };