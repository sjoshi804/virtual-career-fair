import { v4 as uuid } from 'uuid';
import { Recruiter } from "./recruiter";
import { UserDBSchema } from "../userDBSchema";

class RecruiterDBSchema extends UserDBSchema {

    constructor(recruiter: Recruiter) {
        super();

        // Create new unique id if one has not already been set for this company
        if (recruiter.getId() == undefined) {
            this._id = uuid();
        } else {
            this._id = recruiter.getId();
        }

        // Copy over data to save in db
        this.name = recruiter.getName();
        this.emailId = recruiter.getEmailId();
        this.password = recruiter.getPassword();
        this.userType = recruiter.getUserType();
        
        // Save applicant specific data
        this.userData = {
            company: recruiter.getCompany(),
            jobTitle: recruiter.getJobTitle(),
            yearsOfExperience: recruiter.getYearsOfExperience()
        };

    }
}

export { RecruiterDBSchema };