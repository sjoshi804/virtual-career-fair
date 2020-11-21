import { ISerializable } from "../../db/iSerializable";
import { MeetingNotes } from "../meetingNotes/meetingNotes";
import { Queue } from "../queue/queue";
import { BoothDBSchema } from "./boothDBSchema";

class Booth implements ISerializable
{
    // Private member variables
    private id: string;

    private companyId: string;

    private careerFairId: string;

    // Getters & Setters
    public getId()
    {
        return this.id;
    }

    public getCompanyId()
    {
        return this.companyId;
    }

    public setCareerFairId(careerFairId: string)
    {
        this.careerFairId = careerFairId;
    }

    // Public member variables
    public queue: Queue;

    public constructor(serialized: BoothDBSchema, careerFairId: string)
    {
        this.queue = new Queue();
        this.careerFairId = careerFairId;
        if (serialized != undefined)
        {
            this.id = serialized._id;
            this.companyId = serialized.company;
        }
    }

    // Upon completion of meeting,  save meeting notes
    public async saveMeetingNotes(recruiterId: string, applicantId: string, notes: string)
    {
        await MeetingNotes.db.save(new MeetingNotes(recruiterId, applicantId, this.companyId, this.careerFairId, notes));
    }

    public serialize()
    {
        const serialized = new BoothDBSchema(this);
        this.id = serialized._id;
        return serialized;
    }
}

export { Booth };