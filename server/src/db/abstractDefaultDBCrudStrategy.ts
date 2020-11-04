import DBClient from './dbClient'
import { IDBCrudStrategy } from './iDBCrudStrategy';

abstract class AbstractDefaultDBCrudStrategy implements IDBCrudStrategy
{
    public abstract getCollectionName(): string;

    private collection = DBClient.db.collection(this.getCollectionName());

    public async save(object: any): Promise<boolean>
    {
        try
        {
            await this.collection.insertOne(object);
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
            await this.collection.updateOne(filterQuery, updateQuery);
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
            await this.collection.updateMany(filterQuery, updateQuery);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async findOne(query: any): Promise<any> 
    {
        try
        {
            return await this.collection.findOne(query);
        }
        catch
        {
            return null;
        }
    }

    public async findMany(query: any): Promise<any[]> 
    {
        try
        {
            var cursor = this.collection.find(query);
            var results = new Array<any>();
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
            await this.collection.deleteOne(filter)
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
            await this.collection.deleteOne(filter);
            return true;
        }
        catch
        {
            return false;
        }
    }
 
}

export { AbstractDefaultDBCrudStrategy };