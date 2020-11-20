import { v4 as uuid } from 'uuid';
import { Organizer } from "./organizer";
import { UserDBSchema } from "../userDBSchema";

class OrganizerDBSchema extends UserDBSchema {

    constructor(organizer: Organizer) {
        super(); 

        // Create new unique id if one has not already been set for this company
        if (organizer.getId() == undefined) {
            this._id = uuid();
        } else {
            this._id = organizer.getId();
        }

        // Copy over data to save in db
        this.name = organizer.getName();
        this.emailId = organizer.getEmailId();
        this.password = organizer.getPassword();
        this.userType = organizer.getUserType();
        
        // Save organizer specific data
        this.userData = {
            affiliatedOrganization: organizer.getAffiliatedOrganization() 
        };

    }
}

export { OrganizerDBSchema };