class Queue 
{
    // List of ids
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
    public leaveQueue(applicant: string)
    {
        if (this.isApplicantInQueue(applicant))
        {
            this.applicantIds.splice(this.applicantIds.indexOf(applicant), 1);
        }
    }

    // Adds a Applicant to the queue
    public joinQueue(applicant: string)
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
    public dequeue()
    {
        if (this.getLength() > 0)
        {
            return this.applicantIds.splice(0, 1)[0];
        }
        else
        {
            throw new Error("dequeue on empty queue");
        }
    }

    // Get length of queue - to estimate wait time
    public getLength()
    {
        return this.applicantIds.length;
    }

    private isApplicantInQueue(applicant: string)
    {
        return (this.applicantIds.indexOf(applicant) != -1)
    }
}

export { Queue };