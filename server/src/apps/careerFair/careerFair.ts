import { ISerializable } from "../../db/iSerializable";
import { Booth } from "../booth/booth";
import { CareerFairDBSchema } from "./careerFairDBSchema";
import { CareerFairDBStrategy } from "./careerFairDBStrategy";
import { v4 as uuid } from 'uuid';

class CareerFair implements ISerializable
{
    // Static fields and methods to allow access to db and live career fairs

    // DB strategy static reference
    public static db = new CareerFairDBStrategy();

    private static liveCareerFairs = new Map<string, CareerFair>();

    public static async getLiveCareerFair(careerFairId)
    {
        // First time a new live fair is being requested for, will retrieve from db and clean up liveCareerFairs to remove those that are no longer live
        // Amortized cost of this across all requests to getCareerFair
        if (!this.liveCareerFairs.has(careerFairId))
        {
            /*
            // Clean up liveCareerFairs to optimize memory
            for (let [id, fair] of this.liveCareerFairs)
            {
                // Check if fair is not live, mark fair as null
                if (fair.endTime < new Date() || fair.startTime > new Date())
                {
                    this.liveCareerFairs.delete(id);
                }
            }
            */
            this.liveCareerFairs.set(careerFairId, new CareerFair(await this.db.findOne({_id: careerFairId})));
        }

        return this.liveCareerFairs.get(careerFairId);
    }

    public static updateLiveCareerFair(careerFairId: string, careerFair: CareerFair)
    {
        this.liveCareerFairs.set(careerFairId, careerFair);
    }

    // Instance member fields

    // ID field
    public id: string;

    // Name field
    public name: string;
    
    // Organizer (id) field
    public organizer: string;

    // Booths in career fair: companyId -> Booth
    public booths: Map<string, Booth>;

    // List of ids of all applicants who attended / are attending
    public attendingApplicants: Array<string>;

    // List of ids of all recruiters who attended / are attending
    public attendingRecruiters: Array<string>;

    // Start Time
    public startTime: Date;

    // End Time
    public endTime: Date;

    // Getters & Setters
    public getId()
    {
        return this.id;
    }
    
    // Regular constructor - takes in both DBSchema and regular parameters
    // if db schema present initialize from that, else rely on parameters
    public constructor(serialized: CareerFairDBSchema, organizer?: string, startTime?: Date, 
        endTime?: Date, attendingApplicants?: Array<string>, attendingRecruiters?: Array<string>, booths?: Map<string, Booth>)
    {
        if (serialized != undefined) {
            this.id = serialized._id;
            this.organizer = serialized.organizer;
            this.startTime = serialized.startTime;
            this.endTime = serialized.endTime;
            this.booths = new Map<string, Booth>();
            this.attendingApplicants = new Array<string>();
            this.attendingRecruiters = new Array<string>();

            if (serialized.attendingApplicants != undefined)
            {
                serialized.attendingApplicants.forEach(aid => {
                    this.attendingApplicants.push(aid);
                })
            }   

            if (serialized.attendingRecruiters != undefined)
            {
                serialized.attendingRecruiters.forEach(rid => {
                    this.attendingRecruiters.push(rid);
                })
            }

            if (serialized.booths != undefined)
            {
                for (var key in serialized.booths) 
                {
                    if (Object.prototype.hasOwnProperty.call(serialized.booths, key)) 
                    {
                        const booth = serialized.booths[key];
                        this.booths[key] = new Booth(null, booth.careerFairId, booth.companyId);
                    }
                }
            }
        }
        else {
            this.id = uuid();
            this.organizer = organizer;
            this.startTime = startTime;
            this.endTime = endTime;
            this.booths = new Map<string, Booth>();
            this.attendingApplicants = new Array<string>();
            this.attendingRecruiters = new Array<string>();

            if (attendingApplicants != undefined)
            {
                attendingApplicants.forEach(aid => {
                    this.attendingApplicants.push(aid);
                })
            }

            if (attendingRecruiters != undefined)
            {
                attendingRecruiters.forEach(rid => {
                    this.attendingRecruiters.push(rid);
                })
            }

            if (booths != undefined)
            {
                booths.forEach((booth, cid) => {
                    this.booths.set(cid, booth);
                })
            }
        }
    }

    // Serialize using DB Schema object
    public serialize()
    {
        var serialized = new CareerFairDBSchema(this)
        // this.id = serialized._id;
        return serialized;
    }
}

export { CareerFair }