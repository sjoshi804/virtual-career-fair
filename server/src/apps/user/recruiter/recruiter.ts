import { User } from '../user'
import { RecruiterDBSchema } from './recruiterDBSchema';
import { ISerializable } from '../../../db/iSerializable';
import { UserDBSchema } from '../userDBSchema';

class Recruiter extends User implements ISerializable {

    private company: string;
    private jobTitle: string;
    private yearsOfExperience: number;

    public constructor(serialized: UserDBSchema, userType?: number, name?: string, email?: string, password?: string,
        company?: string, jobTitle?: string, yearsOfExperience?: number) {
            if (serialized != undefined) {
                super(serialized.userType, serialized.name, serialized.email, serialized.password, serialized._id);
            }
    }

    public serialize() {
        var serialized = new RecruiterDBSchema(this);
        this.setId(serialized._id);
        return serialized;
    }

    public getCompany(): string {
        return this.company;
    }

    public setCompany(company: string): void {
        this.company = company;
    }

    public getJobTitle(): string {
        return this.jobTitle;
    }

    public setJobTitle(jobTitle: string): void {
        this.jobTitle = jobTitle;
    }

    public getYearsOfExperience(): number {
        return this.yearsOfExperience;
    }

    public setYearsOfExperience(yearsOfExperience: number): void {
        this.yearsOfExperience = yearsOfExperience;
    }

}

export { Recruiter };