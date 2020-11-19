class UserDBSchema {
    
    public _id: string;
    public name: string;
    public emailId: string;
    public password: string;
    public userType: number;
    public userData: any;

    constructor() {}

}

export { UserDBSchema };