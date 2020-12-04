import { User } from '../user'
import { OrganizerDBSchema } from './organizerDBSchema';
import { OrganizerDBStrategy } from './organizerDBStrategy'; 
import { ISerializable } from '../../../db/iSerializable';
import { UserDBSchema } from '../userDBSchema';

class Organizer extends User implements ISerializable {
    
    private affiliatedOrganization: string;

    public static db = new OrganizerDBStrategy();

    public constructor(serialized: UserDBSchema, userType?: number, name?: string, email?: string, password?: string,
                        affiliatedOrganization?: string) {
        if (serialized != undefined) {
            super(serialized.userType, serialized.name, serialized.email, serialized.password, serialized._id);
        }
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