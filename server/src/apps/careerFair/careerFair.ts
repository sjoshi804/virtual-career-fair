import { ISerializable } from "../../db/iSerializable";
import { Booth } from "../booth/booth";
import { CareerFairDBSchema } from "./careerFairDBSchema";
import { CareerFairDBStrategy } from "./careerFairDBStrategy";

class CareerFair implements ISerializable
{
    // Static fields and methods to allow access to db and live career fairs

    // DB strategy static reference
    public static db = new CareerFairDBStrategy();

    private static liveCareerFairs = new Map<string, CareerFair>();

    public static async getLiveCareerFair(careerFairId)
    {
        // If career fair object already exists in live fairs, then return it -> speed is critical here
        if (this.liveCareerFairs.has(careerFairId))
        {
            return this.liveCareerFairs.get(careerFairId);
        }
        // First time a new live fair is being requested for, will retrieve from db and clean up liveCareerFairs to remove those that are no longer live
        // Amortized cost of this across all requests to getCareerFair
        else
        {
            // Clean up liveCareerFairs to optimize memory
            for (let [id, fair] of this.liveCareerFairs)
            {
                // Check if fair is not live, mark fair as null
                if (fair.endTime < new Date() || fair.startTime > new Date())
                {
                    this.liveCareerFairs.delete(id);
                }
            }

            return new CareerFair(await this.db.findOne({_id: careerFairId}));
        }
    }

    // Instance member fields

    // ID field
    public id: string;

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
    public constructor(serialized: CareerFairDBSchema)
    {
        //TODO: Finish this constructor
    }

    // Serialize using DB Schema object
    public serialize()
    {
        return new CareerFairDBSchema(this)
    }
}

export { CareerFair }