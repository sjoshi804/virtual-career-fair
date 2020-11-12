var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
import { verify } from 'crypto';
import { tokenSecret } from '../../.config';
import { IHasID } from '../../db/iHasID';

const message = 'message';
const tokenExpired = 'TokenExpiredError';

class User implements IHasID
{
    // Private fields
    private name: string;
    private emailId: string;
    private password: string;
    private token: string;
    private id: string;

    // Constructor
    public constructor(name: string, emailId: string, password: string, token: string) {
        this.name = name;
        this.emailId = emailId;

        if (token !== undefined)
            this.token = token;    
        else
            this.token = undefined;

        if (passwordHash.isHashed(password))
            this.password = password;
        else {
            var hashedPassword = passwordHash.generate(password);
            this.password = hashedPassword;
        }
    }

    public createUser() {
        // TODO: Check database to ensure this user doesn't already exist
        // Generate token
        this.createToken();
        // TODO: Save user information to database
        return this.token;
    }

    // Verify that input password matches the user's saved password
    public checkPassword(typedPassword: string) {
        return passwordHash.verify(typedPassword, this.password);
    }

    // Public method to get Token
    public getToken() {
        if (this.token == null)
            this.createToken();
        return this.token;
    }

    // Verify if a token is valid
    public validateToken(token: string) {
        var userData = this.getDataFromToken(token);

        // Check for error
        if (message in userData) {
            console.log(message);
            return false;
        }
        // Verify that the data matches this user's data
        if ((userData.name == this.name) && (userData.email == this.emailId) && 
                    (userData.password  == this.password)) {
            return true
        }
        
        return false;
    }

    // Update token if token validation fails
    public updateToken() {
        // If no token provided, create and return token
        if (this.token == null)
            return this.getToken();
        // Get data from token
        var userData = this.getDataFromToken(this.token);
        // Token expired, so create a new one
        if (userData.name == tokenExpired)
            this.createToken();
        return this.token;
    }

    // Generate token that expires in 4 hours
    private createToken() {
        var data = {
            name: this.name,
            email: this.emailId,
            password: this.password
        }
        this.token = jwt.sign({data: data}, tokenSecret, 
            {expiresIn: '4h'});
    }

    // Decode data from token
    private getDataFromToken(token: string) {
        var data = null;
        if (token != null) {
            // Get data from encrypted token 
            try {
                // Verify also checks for expiry time
                var decoded = jwt.verify(token, tokenSecret);
                var data = decoded.data;
            } catch(err) {
                return err;
            }
        } else {
            throw Error('no token to extract data from');
        }
        return data
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
        var hashedPassword = hashedPassword.generate(password);
        this.password = password;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

}

export { User };