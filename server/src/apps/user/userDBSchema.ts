class UserDBSchema {
    
    public _id: string;
    public name: string;
    public email: string;
    public password: string;
    public userType: number;
    public userData: any;

    constructor() {}

}

export { UserDBSchema };