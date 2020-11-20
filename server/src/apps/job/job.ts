import { Applicant } from '../user/applicant/applicant'
class Job
{
    private id: string;
    private title : string;
    private description: string;
    private preferredMajors: Array<string>;
    private isOpen: boolean;
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

    public getApplicants(): Array<Applicant>
    {
        return this.applicants;
    }
    
    public constructor(title: string, description?: string, preferredMajors?: Array<string>)
    {
        this.title = title;
        this.description = description;
        this.preferredMajors = preferredMajors;
        this.applicants = new Array<Applicant>();
        this.isOpen = true;
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

    public closePosting()
    {
        this.isOpen = false;
    }
}

export { Job };