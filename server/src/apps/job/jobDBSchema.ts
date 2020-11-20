import { Job } from "./job";
import { v4 as uuid } from 'uuid';

class JobDBSchema
{

    public _id: string;

    public title : string;

    public description: string;

    public preferredMajors: Array<string>;

    public isOpen: boolean;

    public applicantIds: Array<string>;

    constructor(job: Job)
    {
        // Create new unique id if one has not already been set for this company
        if (job.getId() == undefined)
        {
            this._id = uuid();
        }
        else
        {
            this._id = job.getId();
        }

        // Copy over data to save in db
        this.title = job.getTitle();
        this.description = job.getDescription();
        this.preferredMajors = new Array<string>();
        this.isOpen = job.getOpenStatus();
        this.applicantIds = new Array<string>();
        job.getPreferredMajors().forEach(pm => {
            this.preferredMajors.push(pm);
        });
        job.getApplicantIds().forEach(aid => {
            this.applicantIds.push(aid);
        });
    }
}

export { JobDBSchema };