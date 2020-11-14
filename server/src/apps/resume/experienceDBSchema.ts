import { Experience } from "./experience";

class ExperienceDBSchema
{

    private startDate: string;

    private endDate: string;

    private organization: string;

    private location: string;
    
    private description: string;

    constructor(experience: Experience)
    {
        // Copy over data to save in db
        this.startDate = experience.getStartDate();
        this.endDate = experience.getEndDate();
        this.organization = experience.getOrganization();
        this.location = experience.getLocation();
        this.description = experience.getDescription();
    }
}

export { ExperienceDBSchema };