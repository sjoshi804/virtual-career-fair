import { User } from '../user'
import { RecruiterDBSchema } from './recruiterDBSchema';
import { ISerializable } from '../../../db/iSerializable';

class Recruiter extends User implements ISerializable {

    private company: string;
    private jobTitle: string;
    private yearsOfExperience: number;

    public constructor(userType: number, name: string, email: string, password: string,
        company: string, jobTitle: string, yearsOfExperience: number) {

        super(userType, name, email, password);
        this.company = company;
        this.jobTitle = jobTitle;
        this.yearsOfExperience = yearsOfExperience;
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