import { CareerFair } from "./careerFair";
import { v4 as uuid } from 'uuid';
import { BoothDBSchema } from "../booth/boothDBSchema";

class CareerFairDBSchema
{
    // Member Variables -> must correspond to careerFair document schema
   
    // ID field
    public _id: string;

    // Organizer: id field
    public organizer: string;

    // Booths in career fair: companyId -> BoothDBSchema
    public booths: Map<string, BoothDBSchema>;
    
    // List of ids of all applicants who attended / are attending
    public attendingApplicants: Array<string>;

    // List of ids of all recruiters who attended / are attending
    public attendingRecruiters: Array<string>;

    // Start Time
    public startTime: Date;

    // End Time
    public endTime: Date;
    
    
    constructor(object: CareerFair)
    {
        // Generate id if object doesn't have one
        if (object.getId() == undefined)
        {
            this._id == uuid();
        }
        else
        {
            this._id = object.getId();
        }

        // Serialize the booths hash table
        for (let [id, booth] of object.booths)
        {
            this.booths.set(id, booth.serialize());
        }

        // Copy over rest of the member fields
        this.attendingApplicants = object.attendingApplicants;
        this.attendingRecruiters = object.attendingRecruiters;
        this.startTime = object.startTime;
        this.endTime = object.endTime;
        this.organizer = object.organizer;
    }
}

export { CareerFairDBSchema }