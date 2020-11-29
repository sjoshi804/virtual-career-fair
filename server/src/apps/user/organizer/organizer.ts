import { User } from '../user'
import { OrganizerDBSchema } from './organizerDBSchema';
import { OrganizerDBStrategy } from './organizerDBStrategy'; 
import { ISerializable } from '../../../db/iSerializable';

class Organizer extends User implements ISerializable {
    
    private affiliatedOrganization: string;

    public static db = new OrganizerDBStrategy();

    public constructor(userType: number, name: string, emailID: string, password: string, token: string, 
                        affiliatedOrganization: string) {
        super(userType, name, emailID, password, token);
        this.affiliatedOrganization = affiliatedOrganization;
    }

    public serialize() {
        var serialized = new OrganizerDBSchema(this);
        this.setId(serialized._id);
        return serialized;
    }

    public getAffiliatedOrganization(): string {
        return this.affiliatedOrganization;
    }

    public setAffiliatedOrganization(affiliatedOrganization: string): void {
        this.affiliatedOrganization = affiliatedOrganization;
    }

}

export { Organizer };