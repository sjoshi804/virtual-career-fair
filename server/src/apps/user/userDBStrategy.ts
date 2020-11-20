import { AbstractDefaultDBCrudStrategy } from "../../db/abstractDefaultDBCrudStrategy";
import { UserDBSchema } from "./userDBSchema";

class UserDBStrategy extends AbstractDefaultDBCrudStrategy<UserDBSchema>
{
    private static collectionName = "user";

    public getCollectionName(): string {
        return UserDBStrategy.collectionName;
    }
}

export { UserDBStrategy };