import { Applicant } from "../user/applicant";
import { Recruiter } from "../user/recruiter";

class MeetingNotes
{
    public recruiterId: string;

    public applicantId: string;

    public companyId: string;

    public careerFairId: string;

    public notes: string;

    constructor(recruiter: Recruiter, applicant: Applicant, companyId: string, careerFairId: string, notes: string)
    {
        this.recruiterId = recruiter.getId();
        this.applicantId = applicant.getId();
        this.companyId = companyId;
        this.careerFairId = careerFairId;
        this.notes = notes;
    }
}

export { MeetingNotes };