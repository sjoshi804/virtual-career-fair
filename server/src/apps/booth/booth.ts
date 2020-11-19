import { Meeting } from "../meeting/meeting";
import { Queue } from "../queue/queue";
import { Recruiter } from "../user/recruiter/recruiter"
import { User } from "../user/user"

class Booth
{
    private queue: Queue;
    private meetings: Array<Meeting>;

    public constructor()
    {
        this.queue = new Queue();
        this.meetings = new Array<Meeting>();
    }

    public getCompany()
    {
        // TODO: Make call to database?
    }

    public startMeetingWithNextApplicant(recruiters: Array<Recruiter>)
    {
        var nextApplicant = this.queue.dequeue();
        var participants = new Array<User>(nextApplicant);
        recruiters.forEach(recruiter => {
            participants.push(recruiter)
        });

        var meeting = new Meeting(participants);
        this.meetings.push(meeting);
        return meeting;
    }
}

export { Booth };