import { User } from './user'

class Recruiter extends User
{
    public constructor(name: string)
    {
        super(name)
    }
}

export { Recruiter };