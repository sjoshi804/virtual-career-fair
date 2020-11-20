class Experience 
{
    private startDate: string;
    private endDate: string;
    private organization: string;
    private location: string;
    private description: string;

    public constructor(startDate: string, endDate: string, organization: string, location: string, description: string)
    {
        this.startDate = startDate;
        this.endDate = endDate;
        this.organization = organization;
        this.location = location;
        this.description = description;
    }

    public getStartDate(): string {
        return this.startDate;
    }

    public getEndDate(): string {
        return this.endDate;
    }

    public getOrganization(): string {
        return this.organization;
    }

    public getLocation(): string {
        return this.location;
    }

    public getDescription(): string {
        return this.description;
    }
}

export { Experience }