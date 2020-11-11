import { ISerializable } from "../../db/iSerializable";
import { Job } from "../job/job";
import { Recruiter } from "../user/recruiter";
import { CompanyDBSchema } from "./companyDBSchema";
import { CompanyDBStrategy } from "./companyDBStrategy";

class Company implements ISerializable
{

    private name: string;
    private industry: string;
    private description: string;
    private image: string; 
    private jobs: Array<Job>;
    private recruiters: Array<Recruiter>;
    private id: string;
    
    public static db = new CompanyDBStrategy();

    // Getters and Setters
    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getIndustry(): string {
        return this.industry;
    }

    public setIndustry(industry: string): void {
        this.industry = industry;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getImage(): string {
        return this.image;
    }

    public setImage(image: string): void {
        this.image = image;
    }

    public getJobs(): Array<Job> {
        return this.jobs;
    }

    public getRecruiters(): Array<Recruiter> {
        return this.recruiters;
    }

    public constructor(name: string, industry: string, description: string, image?: string)
    {
        this.name = name;
        this.industry = industry;
        this.description = description;
        this.image = image;
        this.jobs = new Array<Job>();
        this.recruiters = new Array<Recruiter>();
    }

    public serialize() 
    {
        var serialized =  new CompanyDBSchema(this);
        this.id = serialized._id;
        return serialized;
    }

    public addRecruiterToCompany(recruiter: Recruiter)
    {
        if (this.recruiters.indexOf(recruiter) == -1)
        {
            this.recruiters.push(recruiter)
        }
    }   

    public addJobToCompany(job: Job)
    {
        if (this.jobs.indexOf(job) == -1)
        {
            this.jobs.push(job);
        }
    }
}

export { Company }