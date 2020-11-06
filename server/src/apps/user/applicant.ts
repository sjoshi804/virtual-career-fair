import { User } from './user'

class Applicant extends User
{
    public constructor(name: string)
    {
        super(name)
    }
}

export { Applicant };