import { Resume } from "./resume";
import { ExperienceDBSchema } from "./experienceDBSchema";
import { v4 as uuid } from 'uuid';
import { parseConfigFileTextToJson } from "typescript";

class ResumeDBSchema
{
    public _id: string 

    public applicantId: string;

    public skills: Array<string>;

    public experiences: Array<ExperienceDBSchema>;
    
    public insights: Array<string>;

    constructor(resume: Resume) {
        // Create new unique id if one has not already been set for this company
        if (resume.getId() == undefined) {
            this._id = uuid();
        }
        else {
            this._id = resume.getId();
        }

        // Copy over data to save in db
        this.applicantId = resume.getApplicantId();
        this.skills = new Array<string>();
        this.experiences = new Array<ExperienceDBSchema>();
        this.insights = new Array<string>();
        resume.getSkills().forEach(skill => {
            this.skills.push(skill);
        });
        resume.getExperiences().forEach(exp => {
            this.experiences.push(new ExperienceDBSchema(exp));
        });
        resume.getInsights().forEach(insight => {
            this.insights.push(insight);
        });

    }
}

export { ResumeDBSchema };