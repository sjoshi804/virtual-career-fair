import { ISerializable } from "../../db/iSerializable";
import { Booth } from "../booth/booth";
import { Applicant } from "../user/applicant/applicant";
import { CareerFairDBSchema } from "./careerFairDBSchema";
import { CareerFairDBStrategy } from "./careerFairDBStrategy";

class CareerFair implements ISerializable
{
    // Static fields and methods to allow access to db and live career fairs

    // DB strategy static reference
    public static db = new CareerFairDBStrategy();

    private static liveCareerFairs = new Map<string, CareerFair>();

    public static getLiveCareerFair(careerFairId)
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
            for (let [id, fair] of this.liveCareerFairs)
            {
                // Check if fair is live

                
            }

            return new CareerFair(this.db.findOne());
        }
    }

    // Instance member fields

    // ID field
    public id: string;

    // Booths in career fair: companyId -> Booth
    public booths: Map<string, Booth>;

    // Applicants in career fair: TODO: Do I need this
    public applicants: Array<Applicant>;

    // Start Time
    public startTime: Date;

    // End Time
    public endTime: Date;
    
    // Regular constructor - takes in both DBSchema and regular parameters
    // if db schema present initialize from that, else rely on parameters
    public constructor(serialized: CareerFairDBSchema)
    {
        
    }

    // Serialize using DB Schema object
    public serialize()
    {
        return new CareerFairDBSchema(this)
    }
}

export { CareerFair }