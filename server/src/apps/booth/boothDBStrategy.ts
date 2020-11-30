import { IDBCrudStrategy } from "../../db/iDBCrudStrategy";
import { ISerializable } from "../../db/iSerializable";
import { BoothDBSchema } from "./boothDBSchema"

//TODO: this has some work to do since booth is an embedded object
class BoothDBStrategy implements IDBCrudStrategy<BoothDBSchema>
{
    save(object: ISerializable): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    updateOne(filterQuery: any, updateQuery: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    updateMany(filterQuery: any, updateQuery: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    findOne(query: any): Promise<BoothDBSchema> {
        throw new Error("Method not implemented.");
    }
    findMany(query: any): Promise<BoothDBSchema[]> {
        throw new Error("Method not implemented.");
    }
    deleteOne(filter: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteMany(filter: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    private static collectionName = "careerFair";

    public getCollectionName(): string {
        return BoothDBStrategy.collectionName;
    }
}

export { BoothDBStrategy }