import { CareerFair } from "./careerFair";
import { v4 as uuid } from 'uuid';
import { Booth } from "../booth/booth";

class CareerFairDBSchema
{
    // Member Variables -> must correspond to careerFair document schema
   
    // ID field
    public _id: string;

    // Organizer: id field
    public organizer: string;

    public name: string;

    // Booths in career fair: companyId -> Booth 
    // FIXME: FUTURE: Change to booth db schema in futre
    public booths: Map<string, Booth>;
    
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

        // Copy the booths hash table
        this.booths = object.booths

        // Copy over rest of the member fields
        this.name = object.name;
        this.attendingApplicants = object.attendingApplicants;
        this.attendingRecruiters = object.attendingRecruiters;
        this.startTime = object.startTime;
        this.endTime = object.endTime;
        this.organizer = object.organizer;
    }
}

export { CareerFairDBSchema }