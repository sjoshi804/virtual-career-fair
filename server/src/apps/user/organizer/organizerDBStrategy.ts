import { AbstractDefaultDBCrudStrategy } from "../../../db/abstractDefaultDBCrudStrategy";
import { OrganizerDBSchema } from "./organizerDBSchema";

class OrganizerDBStrategy extends AbstractDefaultDBCrudStrategy<OrganizerDBSchema>
{
    private static collectionName = "user";

    public getCollectionName(): string {
        return OrganizerDBStrategy.collectionName;
    }
}

export { OrganizerDBStrategy };