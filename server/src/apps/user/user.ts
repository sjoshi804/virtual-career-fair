class User {
    // Private fields
    private name: string;
    private emailId: string;
    private password: string;
    private signedIn: boolean;

    // Constructor
    public constructor(name: string, emailId: string, password: string) {
        this.name = name;
        this.emailId = emailId;
        this.password = password;
    }

    // Verify that input password matches the user's saved password
    public static verifyLogin(typedPassword: string, savedPassword: string) {
        return typedPassword == savedPassword;
    }

    /**** Getter and setter methods for private members ****/

    // Getter User's Full Name
    public getName() {
        return this.name;
    }

    // Get Email Id
    public getEmailId() {
        return this.emailId;
    }

    // Get Password
    public getPassword() {
        return this.password;
    }

    // Get Sign In Status
    public getLoginStatus() {
        return this.signedIn;
    }

    // Update Name
    public setName(name: string) {
        this.name = name;
    }

    // Update Email ID
    public setEmailId(emailId: string) {
        this.emailId = emailId;
    }

    // Update Password
    public setPassowrd(password: string) {
        this.password = password;
    }

    // Update Sign In Status
    public setSignInStatus(status: boolean) {
        this.signedIn = status;
    }

}

export { User };