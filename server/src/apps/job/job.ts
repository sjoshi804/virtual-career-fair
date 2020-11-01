import { Company } from '../company/company'
import { Applicant } from '../applicant/applicant'
class Job
{
    private id: string;
    private title : string;
    private company: Company;
    private description: string;
    private preferredMajors: Array<string>;
    private startDate: Date;
    private applicationEndDate: Date;
    private applicants: Array<Applicant>;

    // Getters and Setters
    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getCompany(): Company {
        return this.company;
    }

    public setCompany(company: Company): void {
        this.company = company;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getPreferredMajors(): Array<string> {
        return this.preferredMajors;
    }

    public setPreferredMajors(preferredMajors: Array<string>): void {
        this.preferredMajors = preferredMajors;
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public setStartDate(startDate: Date): void {
        this.startDate = startDate;
    }

    public getApplicationEndDate(): Date {
        return this.applicationEndDate;
    }

    public setApplicationEndDate(applicationEndDate: Date): void {
        this.applicationEndDate = applicationEndDate;
    }

    public getApplicants(): Array<Applicant>
    {
        return this.applicants;
    }
    

    public constructor(id: string, title: string, company: Company, description?: string, preferredMajors?: Array<string>, startDate?: Date, applicationEndDate?: Date)
    {
        this.title = title;
        this.company = company;
        this.description = description;
        this.preferredMajors = preferredMajors;
        this.startDate = startDate;
        this.applicationEndDate = applicationEndDate;
        this.applicants = new Array<Applicant>();
    }

    public apply(applicant: Applicant)
    {
        if (this.applicants.indexOf(applicant) == -1)
        {
            this.applicants.push(applicant);
            return true
        }
        else
        {
            return false;
        }
    }

    public withdraw(applicant: Applicant)
    {
        var applicantIndex = this.applicants.indexOf(applicant);
        if (applicantIndex != -1)
        {
            this.applicants.splice(applicantIndex, 1);
            return true;
        }
        else
        {
            return false;
        }
    }
}

export { Job };