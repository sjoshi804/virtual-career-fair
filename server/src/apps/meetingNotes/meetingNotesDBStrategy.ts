import { AbstractDefaultDBCrudStrategy } from "../../db/abstractDefaultDBCrudStrategy";
import { MeetingNotes } from "./meetingNotes";

class MeetingNotesDBStrategy extends AbstractDefaultDBCrudStrategy<MeetingNotes>
{
    private static collectionName = "meetingNotes";

    public getCollectionName(): string {
        return MeetingNotesDBStrategy.collectionName;
    }
}

export { MeetingNotesDBStrategy };