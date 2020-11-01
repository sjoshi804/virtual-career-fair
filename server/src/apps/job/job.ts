import { Company } from '../company/company'
class Job
{
    private id: string;
    private title : string;
    private company: Company;
    private description: string;
    private preferredMajors: Array<string>;
    private startDate: Date;
    private applicationEndDate: Date;

    public constructor(id: string, title: string, company: Company, description?: string, preferredMajors?: Array<string>, startDate?: Date, applicationEndDate?: Date)
    {
        this.title = title;
        this.company = company;
        this.description = description;
        this.preferredMajors = preferredMajors;
        this.startDate = startDate;
        this.applicationEndDate = applicationEndDate;
    }

}

export { Job };