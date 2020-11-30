import { AbstractDefaultDBCrudStrategy } from "../../db/abstractDefaultDBCrudStrategy";
import { DBClient } from "../../db/dbClient";
import { UserDBSchema } from "./userDBSchema";

class UserDBStrategy extends AbstractDefaultDBCrudStrategy<UserDBSchema>
{
    constructor()
    {
        super();
        this.indexCreated = false;
    }

    private static collectionName = "user";

    private indexCreated: boolean;

    public getCollectionName(): string {
        return UserDBStrategy.collectionName;
    }

    // Ensure index exists
    // TODO: Check index creation by calling get indexes not by checking local variable
    public async save(object: any): Promise<boolean>
    {
        if (!this.indexCreated)
        {
            await this.createIndex();
        }

        return (await super.save(object));
    }

    // Create index to ensure uniqueness of email
    public async createIndex(): Promise<void>
    {
        await DBClient.db.collection(UserDBStrategy.collectionName).createIndex(
            {
                "email": 1
            },
            {
                unique: true
            }
        );

        this.indexCreated = true;
    }
}

export { UserDBStrategy };