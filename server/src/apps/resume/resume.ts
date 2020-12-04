import { ISerializable } from "../../db/iSerializable";
import { ResumeDBSchema } from "./resumeDBSchema";
import { ResumeDBStrategy } from "./resumeDBStrategy";
import { Experience } from "./experience";
import { parseConfigFileTextToJson } from "typescript";
import { throws } from "assert";

class Resume implements ISerializable 
{

    private id: string;
    private applicantId: string;
    private skills: Array<string>;
    private insights: Array<string>;
    private experiences: Array<Experience>

    public static db = new ResumeDBStrategy();

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getApplicantId(): string {
        return this.applicantId;
    }

    public setApplicantId(applicantId: string): void {
        this.applicantId = applicantId;
    }

    public getSkills(): Array<string> {
        return this.skills;
    }

    public addSkill(skill: string): void {
        if (this.skills.indexOf(skill) == -1)
        {
            this.skills.push(skill);
        }
    }

    public getExperiences(): Array<Experience> {
        return this.experiences;
    }

    public addExperience(experience: Experience): void {
        if (this.experiences.indexOf(experience) == -1)
        {
            this.experiences.push(experience);
        }
    }

    public getInsights(): Array<string> {
        return this.insights;
    }

    // Just for making comnparisons during api testing easier.
    public addInsight(insight: string): void{
        this.insights.push(insight);
    }

    public static computeInsights(skills: Array<string>, experiences: Array<Experience>): Array<string> {
        var insights = [['very strong match', 'match is greater than 90%'], 
            ['strong match', 'Has most of the required skills'],
            ['good match', 'Has some of the required skills'],
            ['Does not have enough experience'],
            ["Skills don't match the job description"]
        ]
        var rand = Math.floor(Math.random() * 5)
        return insights[rand]
    }

    public constructor(applicantId: string, skills: Array<string>, experiences: Array<Experience>)
    {
        this.applicantId = applicantId;
        this.skills = new Array<string>();
        skills.forEach(skill => {
            this.skills.push(skill)
        });
        this.insights = new Array<string>();
        this.experiences = new Array<Experience>();
        experiences.forEach(exp => {
            this.experiences.push(exp);
        });
    }

    public serialize() 
    {
        var serialized =  new ResumeDBSchema(this);
        this.id = serialized._id;
        return serialized;
    }

}

export { Resume }