import { Booth } from "./booth";
import { v4 as uuid } from 'uuid';

//TODO:
class BoothDBSchema
{
    // Public member variables
    public _id: string;
    public company: string;

    constructor(object: Booth) {
        
    }
}

export { BoothDBSchema }