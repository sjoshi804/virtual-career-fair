var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
import { tokenSecret } from '../../.config';
import {v4 as uuid } from 'uuid'
import { IHasID } from '../../db/iHasID';
import { UserDBStrategy } from './userDBStrategy';

const message = 'message';
const tokenExpired = 'TokenExpiredError';

class User implements IHasID {

    // Private fields
    private name: string;
    private email: string;
    private password: string;
    private token: string;
    private userType: number;

    // Protected Fields
    protected id: string;

    // DataBase
    public static db = new UserDBStrategy();

    // Constructor
    public constructor(userType: number, name: string, email: string, password: string, id?: string) {
        this.name = name;
        this.email = email;

        this.userType = userType;
        
        if (passwordHash.isHashed(password))
            this.password = password;
        else {
            var hashedPassword = passwordHash.generate(password);
            this.password = hashedPassword;
        }

        if (id == undefined) {
            this.id == uuid();
        } else {
            this.id = id;
        }
    }

    // Public method to get Token
    public getToken() {
        if (this.token == undefined)
            this.createToken();
        return this.token;
    }

    // Verify if a token is valid
    public static async validateToken(token: string) {
        var userData = User.getDataFromToken(token);
        console.log(userData);

        // Check for error
        if (message in userData) {
            console.log(userData);
            return false;
        }

        // Instantiate user object 
        const filterQuery = {
            _id: userData.id
        }

        const user = await User.db.findOne(filterQuery);

        // Verify that the data matches the instantiated user's data
        if ((userData != undefined) && (userData.id == user._id)) {
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
        var userData = User.getDataFromToken(this.token);
        // Token expired, so create a new one
        if (userData.name == tokenExpired)
            this.createToken();
        // Otherwise, just return the created
        return this.token;
    }

    // Generate token that expires in 4 hours
    private createToken() {
        var data = {
            id: this.id
        }
        this.token = jwt.sign(data, tokenSecret);
    }

    // Decode data from token
    public static getDataFromToken(token: string) {
        var decoded = null;
        if (token != null) {
            // Get data from encrypted token 
            try {
                token = token.replace("Bearer ", "").replace("Basic ", "");
                // Verify also checks for expiry time
                decoded = jwt.verify(token, tokenSecret);
            } 
            catch(err) {
                console.log(err)
            }
        } 
        else {
            throw Error('no token to extract data from');
        }
        return decoded
    }

    /**** Getter and setter methods for private members ****/

    // Get User Type
    public getUserType() {
        return this.userType;
    }

    // Getter User's Full Name
    public getName() {
        return this.name;
    }

    // Get Email Id
    public getemail() {
        return this.email;
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
    public setemail(email: string) {
        this.email = email;
    }

    // Update Password
    public setPassword(password: string) {
        var hashedPassword = hashedPassword.generate(password);
        this.password = password;
    }

    // Set User Type
    public setUserType(type: number) {
        this.userType = type;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

}

export { User };