import { User } from './user'

class Organizer extends User
{
    public affiliatedOrganization: string;

    public constructor(name: string, emailID: string, password: string, token: string, affiliatedOrganization: string)
    {
        super(name, emailID, password, token);
        this.affiliatedOrganization = affiliatedOrganization;
    }
}

export { Organizer };