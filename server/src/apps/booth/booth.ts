import { ISerializable } from "../../db/iSerializable";
import { MeetingNotes } from "../meetingNotes/meetingNotes";
import { Queue } from "../queue/queue";
import { BoothDBSchema } from "./boothDBSchema";

import { v4 as uuid } from 'uuid';

class Booth implements ISerializable {
    // Private member variables
    private id: string;

    private companyId: string;

    private careerFairId: string;

    // list of ids of recruiters who are live
    private liveRecruiters: Array<string>;

    // Public member variables
    public queue: Queue;

    // Getters & Setters
    public getId()
    {
        return this.id;
    }

    public getCompanyId()
    {
        return this.companyId;
    }

    public setCompanyId(companyId: string)
    {
        this.companyId = companyId;
    }

    public getCareerFairId()
    {
        return this.careerFairId;
    }

    public setCareerFairId(careerFairId: string) 
    {
        this.careerFairId = careerFairId;
    }

    public constructor(serialized: BoothDBSchema, careerFairId: string, companyId: string) 
    {
        this.queue = new Queue();
        this.careerFairId = careerFairId;
        this.companyId = companyId;
        this.id = uuid();
        if (serialized != undefined) {
            this.id = serialized._id;
            this.companyId = serialized.company;
        }
    }

    // Upon completion of meeting, save meeting notes
    public async saveMeetingNotes(recruiterId: string, applicantId: string, notes: string) {
        await MeetingNotes.db.save(new MeetingNotes(recruiterId, applicantId, this.companyId, this.careerFairId, notes));
    }

    public serialize() {
        const serialized = new BoothDBSchema(this);
        this.id = serialized._id;
        return serialized;
    }
}

export { Booth };