import { AbstractDefaultDBCrudStrategy } from "../../../db/abstractDefaultDBCrudStrategy";
import { UserDBStrategy } from "../userDBStrategy";
import { OrganizerDBSchema } from "./organizerDBSchema";

class OrganizerDBStrategy extends UserDBStrategy
{
    public getCollectionName(): string {
        return super.getCollectionName();
    }
}

export { OrganizerDBStrategy };