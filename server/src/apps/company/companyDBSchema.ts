import { JobDBSchema } from "../job/jobDBSchema";
import { Company } from "./company";
import { v4 as uuid } from 'uuid';

class CompanyDBSchema
{
    public _id: string 

    public name: string;

    public industry: string;
    
    public description: string;
    
    public image: string; //link to logo saved in s3 bucket

    public jobs: Array<JobDBSchema>;

    public recruiters: Array<string> // list of ids

    constructor(company: Company)
    {
        // Create new unique id if one has not already been set for this company
        if (company.getId() == undefined)
        {
            this._id = uuid();
        }
        else
        {
            this._id = company.getId();
        }

        // Copy over data to save in db
        this.name = company.getName();
        this.industry = company.getIndustry();
        this.description = company.getDescription();
        this.image = company.getImage();
        this.jobs = new Array<JobDBSchema>(); // need to fill this in using job db schema constructor
        company.getJobs().forEach(job => {
            this.jobs.push(new JobDBSchema(job));
        });
        this.recruiters = new Array<string>();
        company.getRecruiters().forEach(recruiter => {
            this.recruiters.push(recruiter.getId());
        });

    }
}

export { CompanyDBSchema };