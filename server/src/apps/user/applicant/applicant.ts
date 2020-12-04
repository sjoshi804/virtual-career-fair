import { User } from '../user';
import { ApplicantDBSchema } from './applicantDBSchema';
import { UserDBSchema } from '../userDBSchema';
import { ISerializable } from '../../../db/iSerializable';

class Applicant extends User implements ISerializable {

    private major: string;
    private graduationYear: number;
    private affiliatedSchool: string;
    private bio: string;

    public constructor(serialized: UserDBSchema, userType?: number, name?: string, email?: string, password?: string, major?: string, graduationYear?: number, affiliatedSchool?: string, bio?: string, ) 
    {
        if (serialized != undefined) {
            super(serialized.userType, serialized.name, serialized.email, serialized.password, serialized._id);
        }
    }

    public serialize() {
        var serialized = new ApplicantDBSchema(this);
        this.setId(serialized._id);
        return serialized;
    }

    public getMajor(): string {
        return this.major;
    }

    public setMajor(major: string): void {
        this.major = major;
    }

    public getGraduationYear(): number {
        return this.graduationYear;
    }

    public setGraduationYear(graduationYear: number): void {
        this.graduationYear = graduationYear;
    }

    public getAffiliatedSchool(): string {
        return this.affiliatedSchool;
    }

    public setAffiliatedSchool(affiliatedSchool: string): void {
        this.affiliatedSchool = affiliatedSchool;
    }

    public getBio(): string {
        return this.bio;
    }

    public setBio(bio: string): void {
        this.bio = bio;
    }

}

export { Applicant };