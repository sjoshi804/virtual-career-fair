import { ISerializable } from "../../db/iSerializable";
import { JobDBSchema } from "./jobDBSchema";

class Job implements ISerializable
{
    private id: string;
    private title : string;
    private description: string;
    private preferredMajors: Array<string>;
    private isOpen: boolean;
    private applicantIds: Array<string>;

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

    public getApplicantIds(): Array<string>
    {
        return this.applicantIds;
    }

    public getOpenStatus(): boolean {
        return this.isOpen;
    }

    public setOpenStatus(status: boolean): void {
        this.isOpen = status;
    }
    
    public constructor(title: string, description?: string, preferredMajors?: Array<string>)
    {
        this.title = title;
        this.description = (description != undefined) ? description : '';
        this.preferredMajors = (preferredMajors != undefined) ? preferredMajors : new Array<string>();
        this.applicantIds = new Array<string>();
        this.isOpen = true;
    }

    public apply(applicantId: string)
    {
        if (this.applicantIds.indexOf(applicantId) == -1)
        {
            this.applicantIds.push(applicantId);
            return true
        }
        else
        {
            return false;
        }
    }

    public withdraw(applicantId: string)
    {
        var applicantIndex = this.applicantIds.indexOf(applicantId);
        if (applicantIndex != -1)
        {
            this.applicantIds.splice(applicantIndex, 1);
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

    public serialize() 
    {
        var serialized =  new JobDBSchema(this);
        this.id = serialized._id;
        return serialized;
    }
}

export { Job };