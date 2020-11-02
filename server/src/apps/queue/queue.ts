import { Applicant } from '../user/applicant'

class Queue {
    private applicantList: Array<Applicant>

    public constructor(applicants?: Array<Applicant>)
    {
        if (applicants == null)
        {
            this.applicantList = new Array<Applicant>();
        }
        else
        {
            this.applicantList = applicants;
        }
    }

    // Removes a given Applicant from the queue
    public leaveQueue(Applicant: Applicant)
    {
        if (this.isApplicantInQueue(Applicant))
        {
            this.applicantList.splice(this.applicantList.indexOf(Applicant), 1);
        }
    }

    // Adds a Applicant to the queue
    public joinQueue(Applicant: Applicant)
    {
        if (!this.isApplicantInQueue(Applicant))
        {
            this.applicantList.push(Applicant);
            return true;
        }
        else
        {
            return false;
        }

    }

    // Dequeues the Applicant at the front of the queue
    public dequeue()
    {
        if (this.getLength() > 0)
        {
            return this.applicantList.splice(0, 1)[0];
        }
        else
        {
            throw new Error("dequeue on empty queue");
        }
    }

    // Get length of queue - to estimate wait time
    public getLength()
    {
        return this.applicantList.length;
    }

    private isApplicantInQueue(Applicant: Applicant)
    {
        return (this.applicantList.indexOf(Applicant) != -1)
    }
}

export { Queue };