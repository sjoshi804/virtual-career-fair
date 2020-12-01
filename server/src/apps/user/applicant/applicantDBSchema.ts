import { v4 as uuid } from 'uuid';
import { Applicant } from "./applicant";
import { UserDBSchema } from "../userDBSchema";

class ApplicantDBSchema extends UserDBSchema {

    constructor(applicant: Applicant) {
        super();

        // Create new unique id if one has not already been set for this company
        if (applicant.getId() == undefined) {
            this._id = uuid();
        } else {
            this._id = applicant.getId();
        }

        // Copy over data to save in db
        this.name = applicant.getName();
        this.email = applicant.getemail();
        this.password = applicant.getPassword();
        this.userType = applicant.getUserType();
        
        // Save applicant specific data
        this.userData = {
            major: applicant.getMajor(),
            graduationYear: applicant.getGraduationYear(),
            affiliatedSchool: applicant.getAffiliatedSchool(),
            bio: applicant.getBio()
        };

    }

}

export { ApplicantDBSchema };