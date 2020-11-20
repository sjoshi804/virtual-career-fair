import { AbstractDefaultDBCrudStrategy } from "../../db/abstractDefaultDBCrudStrategy";
import { ResumeDBSchema } from "./resumeDBSchema";

class ResumeDBStrategy extends AbstractDefaultDBCrudStrategy<ResumeDBSchema>
{
    private static collectionName = "resume";

    public getCollectionName(): string {
        return ResumeDBStrategy.collectionName;
    }
}

export { ResumeDBStrategy };