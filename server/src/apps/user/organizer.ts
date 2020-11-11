import { User } from './user'

class Organizer extends User
{
    public constructor(name: string)
    {
        super(name)
    }
}

export { Organizer };