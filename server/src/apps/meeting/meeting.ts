import { Applicant } from "../user/applicant";
import { Recruiter } from "../user/recruiter";
import { MeetingNotes } from "./meetingNotes";

class Meeting
{
    private recruiter: Recruiter;
    private applicant: Applicant;
    private link: string;
    private companyID: string;
    private careerFairID: string;
    
    public getLink(): string {
        return this.link;
    }

    public setLink(link: string): void {
        this.link = link;
    }

    public constructor(recruiter: Recruiter, applicant: Applicant, companyID: string, careerFairID: string)
    {
        this.recruiter = recruiter;
        this.applicant = applicant;
        this.link = "";
        this.companyID = companyID;
        this.careerFairID = careerFairID;
    }
}

export { Meeting }