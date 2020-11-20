import { Applicant } from "../user/applicant/applicant";
import { Recruiter } from "../user/recruiter/recruiter";
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

    public constructor(recruiter: Recruiter, applicant: Applicant, companyID: string, careerFairID: string)
    {
        this.recruiter = recruiter;
        this.applicant = applicant;
        this.link = ""; // call out to WebRTCAdapter
        this.companyID = companyID;
        this.careerFairID = careerFairID;
    }
}

export { Meeting }