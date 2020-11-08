import { User } from './user'

class Applicant extends User
{
    public constructor(name: string, emailID: string, password: string, token: string)
    {
        super(name, emailID, password, token);
    }
}

export { Applicant };