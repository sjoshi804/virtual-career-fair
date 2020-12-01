import { CareerFair } from "../careerFair/careerFair";
import { CareerFairSocketProtocol } from "../socket/careerFairSocketProtocol";

class Queue 
{
    // List of ids / usernames
    private applicantIds: Array<string> 

    public constructor(applicantIds?: Array<string>)
    {
        if (applicantIds == null)
        {
            this.applicantIds = new Array<string>();
        }
        else
        {
            this.applicantIds = applicantIds;
        }
    }

    // Removes a given Applicant from the queue
    public leaveQueue(applicant: string): boolean
    {
        if (this.isApplicantInQueue(applicant))
        {
            this.applicantIds.splice(this.applicantIds.indexOf(applicant), 1);
            return true;
        }
        else 
        {
            return false;
        }
    }

    // Adds a Applicant to the queue
    public joinQueue(applicant: string): boolean
    {
        if (!this.isApplicantInQueue(applicant))
        {
            this.applicantIds.push(applicant);
            return true;
        }
        else
        {
            return false;
        }

    }

    // Dequeues the Applicant at the front of the queue
    public dequeue(): string
    {
        if (this.getLength() > 0)
        {
            return this.applicantIds.splice(0, 1)[0];
        }
        else
        {
            throw new Error("dequeue on empty queue");
            return null;
        }
    }

    // Get length of queue - to estimate wait time
    public getLength(): number
    {
        return this.applicantIds.length;
    }

    private isApplicantInQueue(applicant: string)
    {
        return (this.applicantIds.indexOf(applicant) != -1)
    }
}

export { Queue };