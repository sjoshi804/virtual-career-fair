import { User } from './user'

class Organizer extends User
{
    private affiliatedOrganization: string;

    public getAffiliatedOrganization(): string {
        return this.affiliatedOrganization;
    }

    public setAffiliatedOrganization(affiliatedOrganization: string): void {
        this.affiliatedOrganization = affiliatedOrganization;
    }


    public constructor(name: string, emailID: string, password: string, token: string, affiliatedOrganization: string)
    {
        super(name, emailID, password, token);
        this.affiliatedOrganization = affiliatedOrganization;
    }
}

export { Organizer };