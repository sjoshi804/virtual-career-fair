import { User } from './user'

class Recruiter extends User
{
    public constructor(name: string, emailId: string, password: string, token: string)
    {
        super(name, emailId, password, token);
    }
}

export { Recruiter };