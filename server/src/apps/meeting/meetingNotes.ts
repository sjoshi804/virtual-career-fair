import { ISerializable } from "../../db/iSerializable";
import { Applicant } from "../user/applicant";
import { Recruiter } from "../user/recruiter";
import { MeetingNotesDBStrategy } from "./meetingNotesDBStrategy";

class MeetingNotes implements ISerializable
{
    public recruiterId: string;

    public applicantId: string;

    public  companyId: string;

    public careerFairId: string;

    public notes: string;

    public static db = new MeetingNotesDBStrategy();

    // Getters - no setters since object always saved upon construction
    public getRecruiterId(): string {
        return this.recruiterId;
    }

    public getApplicantId(): string {
        return this.applicantId;
    }

    public getCompanyId(): string {
        return this.companyId;
    }

    public getCareerFairId(): string {
        return this.careerFairId;
    }

    public getNotes(): string {
        return this.notes;
    }

    constructor(recruiterId: string, applicantId: string, companyId: string, careerFairId: string, notes: string)
    {
        this.recruiterId = recruiterId;
        this.applicantId = applicantId;
        this.companyId = companyId;
        this.careerFairId = careerFairId;
        this.notes = notes;
    }

    public serialize() {
       return this;
    }
}

export { MeetingNotes };