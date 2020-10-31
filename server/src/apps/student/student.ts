import { isThisTypeNode } from "typescript";

class Student 
{
    public name : string;

    public constructor(name: string)
    {
        this.name = name;
    }
}

export { Student };