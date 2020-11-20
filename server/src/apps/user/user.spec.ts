import { expect, request } from 'chai';
import 'mocha';
import server from '../..';
import chai = require('chai');
import chaiHttp = require('chai-http');
import { DBClient } from '../../db/dbClient';
import { testDatabaseName } from '../../.config';
import { v4 as uuid } from 'uuid';

import { Applicant } from "./applicant/applicant";
import { Recruiter } from "./recruiter/recruiter";
import { Organizer } from "./organizer/organizer";

// To use test HTTP API
chai.use(chaiHttp);

// Dummy objects to use in testing: Applicant, Recruiter, Organizer
var applicantA = new Applicant(0, "appA", "test1@gmail.com", "Lakers", "", "Computer Science", 2021, "UCLA", "");
applicantA.setId(uuid());
var applicantAToken = applicantA.getToken();
var applicantB = new Applicant(0, "appB", "test2@gmail.com", "Rockets", "", "Statistics", 2024, "UCSB", "");
applicantB.setId(uuid());
var applicantBToken = applicantB.getToken();
var applicants = new Array<Applicant>(applicantA, applicantB);

var recruiterA = new Recruiter(1, "recA", "", "", "", "", "Software Developer", 5);
recruiterA.setId(uuid());
var recruiterB = new Recruiter(1, "recB", "", "", "", "", "Data Scientist", 3);
recruiterB.setId(uuid());
var recruiters = new Array<Recruiter>(recruiterA, recruiterB);

var organizerA = new Organizer(2, "orgA", "", "", "", "UCLA");
organizerA.setId(uuid());
var organizerB = new Organizer(2, "orgB", "", "", "", "Stanford");
organizerB.setId(uuid());
var organizers = new Array<Organizer>(organizerA, organizerB);

/* ***** Applicant ******* */

// Test Applicant Class
describe("Applicant", () => {
    
    // Ensure proper object is created
    it('constructor', () => {
        expect(applicantA).to.be.an.instanceof(Applicant);
        expect(applicantB).to.be.an.instanceof(Applicant);
    });

    // Check if password matches hashed password
    it('check password hash is saved correctly', () => {
        expect(applicantA.checkPassword('Lakers'));
        expect(applicantB.checkPassword('Rockets'));
        expect(!applicantA.checkPassword('lakers'));
        expect(!applicantB.checkPassword('R0ckets'));
        expect(!applicantA.checkPassword(''));
    });

    // Check if tokens are valid
    it('token validation', () => {
        expect(applicantA.validateToken(applicantAToken));
        expect(applicantB.validateToken(applicantBToken));
    });

    // Be able to get updated tokens if expired, otherwise return same token
    it('token refresh', () => {
        // Should be equal since the token has not expired
        expect(applicantA.updateToken()).to.be.equal(applicantAToken);
        expect(applicantB.updateToken()).to.be.equal(applicantBToken);
    });

});

// Test Applicant API
const applicant_prefix = '/applicant';
describe("Applicant API (/applicant)", () => {
    
    // Reset database before all tests and after every test
    before(async () => {
        DBClient.connect();
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    afterEach(async () => {
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    // Create new applicant
    it('POST / - create new applicant', async() => {
        const serializedApplicant = applicantA.serialize();
        await request(server).post(applicant_prefix + "/").send(serializedApplicant)
            .then(async res => {
                    expect(res.status).to.be.equal(201);
                    expect(await Applicant.db.findOne({})).to.have.property("_id", serializedApplicant._id);
                }
            );
    });

    // Get All Applicants
    it('GET / - get all applicants', async() => {
        // Create all applicants
        for (var i = 0; i < applicants.length; i++) {
            await request(server).post(applicant_prefix + "/").send(applicants[i].serialize())
            .then(async res => {
                    expect(res.status).to.be.equal(201);
                });
        }
        // Check counts
        expect(await Applicant.db.count({})).to.be.equal(applicants.length);
        // Return all applicants
        await request(server).get(applicant_prefix + "/")
            .then(res => {
                expect(res.status).to.be.equal(200);
                applicants.forEach(applicant => {
                    expect(res.body).to.deep.include(applicant.serialize());
                });
            });
    });

    // Get Specific Applicant
    it('GET /applicant/:userid - get specific applicant', async() => {
        // create Applicant B
        await request(server).post(applicant_prefix + "/").send(applicantB.serialize())
            .then(async res => {
                expect(res.status).to.be.equal(201);
                expect(await Applicant.db.count({})).to.equal(1);
            });
        // get Applicant B
        await request(server).get(applicant_prefix + "/" + applicantB.getId())
            .then(res => {
                expect(res.body).to.be.an('object');
                expect(res.body).deep.equals(applicantB.serialize());
            });
        // expect failure when trying to get applicant A
        await request(server).get(applicant_prefix + "/" + applicantA.getId())
            .then(async res => {
                expect(res.status).to.be.equal(404);
            });
    });

    // Update Specific Applicant
    it('UPDATE /applicant/:userid - update specific applicant', async() => {
        // create Applicant A
        await request(server).post(applicant_prefix + "/").send(applicantA.serialize())
            .then(async res => {
                expect(res.status).to.be.equal(201);
                expect(await Applicant.db.count({})).to.equal(1);
            });
        // Update Applicant
        applicantA.setMajor('Computational Biology');
        await request(server).put(applicant_prefix + "/" + applicantA.getId()).send(applicantA.serialize())
            .then(async res => {
                expect(res.status).to.be.equal(204);
            });
        // Update Non-existent Applicant
        await request(server).put(applicant_prefix + "/" + applicantB.getId()).send(applicantB.serialize())
            .then(async res => {
                expect(res.status).to.be.equal(404);
            });
    });

    // Delete Specific Applicant
    it('DELETE /applicant/:userid - delete specific applicant', async() => {
        // create Applicant B
        await request(server).post(applicant_prefix + "/").send(applicantB.serialize())
            .then(async res => {
                expect(res.status).to.be.equal(201);
                expect(await Applicant.db.count({})).to.equal(1);
            });
        // delete Applicant B
        await request(server).delete(applicant_prefix + "/" + applicantB.getId())
            .then(res => {
                expect(res.status).to.be.equal(204);
            });
        // expect failure when trying to delete applicant A
        await request(server).delete(applicant_prefix + "/" + applicantA.getId())
            .then(async res => {
                expect(res.status).to.be.equal(404);
            });
    });

});

/* ***** Organizer ******* */

// Test Organizer Class
describe("Organizer", () => {
    
    // Ensure proper object is created
    it('constructor', () => {
        expect(organizerA).to.be.an.instanceof(Organizer);
        expect(organizerB).to.be.an.instanceof(Organizer);
    });

});

// Test Organizer API
const organizer_prefix = '/organizer';
describe("Organizer API (/organizer)", () => {
    
    // Reset database before all tests and after every test
    before(async () => {
        DBClient.connect();
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    afterEach(async () => {
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    // Create new organizer
    it('POST / - create new organizer', async() => {
        const serializedOrganizer = organizerA.serialize();
        await request(server).post(organizer_prefix + "/").send(serializedOrganizer)
            .then(async res => {
                    expect(res.status).to.be.equal(201);
                    expect(await Organizer.db.findOne({})).to.have.property("_id", serializedOrganizer._id);
                }
            );
    });

    // Get All Organizers
    it('GET / - get all organizers', async() => {
        // Create all organizers
        for (var i = 0; i < organizers.length; i++) {
            await request(server).post(organizer_prefix + "/").send(organizers[i].serialize())
            .then(async res => {
                    expect(res.status).to.be.equal(201);
                });
        }
        // Check counts
        expect(await Organizer.db.count({})).to.be.equal(organizers.length);
        // Return all organizers
        await request(server).get(organizer_prefix + "/")
            .then(res => {
                expect(res.status).to.be.equal(200);
                organizers.forEach(organizer => {
                    expect(res.body).to.deep.include(organizer.serialize());
                });
            });
    });

    // Get Specific Organizer
    it('GET /organizer/:userid - get specific organizer', async() => {
        // create organizer A
        await request(server).post(organizer_prefix + "/").send(organizerA.serialize())
            .then(async res => {
                expect(res.status).to.be.equal(201);
                expect(await Organizer.db.count({})).to.equal(1);
            });
        // get organizer A
        await request(server).get(organizer_prefix + "/" + organizerA.getId())
            .then(res => {
                expect(res.body).to.be.an('object');
                expect(res.body).deep.equals(organizerA.serialize());
            });
        // expect failure when trying to get organizer B
        await request(server).get(organizer_prefix + "/" + organizerB.getId())
            .then(async res => {
                expect(res.status).to.be.equal(404);
            });
    });

    // Update Specific Organizer
    it('UPDATE /organizer/:userid - update specific organizer', async() => {
        // create organizer A
        await request(server).post(organizer_prefix + "/").send(organizerA.serialize())
            .then(async res => {
                expect(res.status).to.be.equal(201);
                expect(await Organizer.db.count({})).to.equal(1);
            });
        // Update Organizer A
        organizerA.setAffiliatedOrganization("Tesla");
        await request(server).put(organizer_prefix + "/" + organizerA.getId()).send(organizerA.serialize())
            .then(async res => {
                expect(res.status).to.be.equal(204);
            });
        // Update Non-existent Organizer B
        await request(server).put(organizer_prefix + "/" + organizerB.getId()).send(organizerB.serialize())
            .then(async res => {
                expect(res.status).to.be.equal(404);
            });
    });

    // Delete Specific Organizer
    it('DELETE /organizer/:userid - delete specific organizer', async() => {
        // create organizer B
        await request(server).post(organizer_prefix + "/").send(organizerB.serialize())
            .then(async res => {
                expect(res.status).to.be.equal(201);
                expect(await Organizer.db.count({})).to.equal(1);
            });
        // delete organizer B
        await request(server).delete(organizer_prefix + "/" + organizerB.getId())
            .then(res => {
                expect(res.status).to.be.equal(204);
            });
        // expect failure when trying to delete organizer A
        await request(server).delete(organizer_prefix + "/" + organizerA.getId())
            .then(async res => {
                expect(res.status).to.be.equal(404);
            });
    });

});

/* ***** Recruiter ******* */

// Test Recruiter Class
describe("Recruiter", () => {

    // Ensure proper object is created
    it('constructor', () => {
        expect(recruiterA).to.be.an.instanceof(Recruiter);
        expect(recruiterB).to.be.an.instanceof(Recruiter);
    });

});

// Test Recruiter API
const recruiter_prefix = '/recruiter';
describe("Recruiter API (/recruiter)", () => {
    
    // Reset database before all tests and after every test
    before(async () => {
        DBClient.connect();
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    afterEach(async () => {
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    // Create new recruiter
    it('POST / - create new recruiter', async() => {
        const serializedRecruiter = recruiterA.serialize();
        await request(server).post(recruiter_prefix + "/").send(serializedRecruiter)
            .then(async res => {
                    expect(res.status).to.be.equal(201);
                    expect(await Recruiter.db.findOne({})).to.have.property("_id", serializedRecruiter._id);
                }
            );
    });

    // Get All Recruiters
    it('GET / - get all recruiters', async() => {
        // Create all recruiters
        for (var i = 0; i < recruiters.length; i++) {
            await request(server).post(recruiter_prefix + "/").send(recruiters[i].serialize())
            .then(async res => {
                    expect(res.status).to.be.equal(201);
                });
        }
        // Check counts
        expect(await Recruiter.db.count({})).to.be.equal(recruiters.length);
        // Return all recruiters
        await request(server).get(recruiter_prefix + "/")
            .then(res => {
                expect(res.status).to.be.equal(200);
                recruiters.forEach(recruiter => {
                    expect(res.body).to.deep.include(recruiter.serialize());
                });
            });
    });

    // Get Specific Recruiter
    it('GET /recruiter/:userid - get specific recruiter', async() => {
        // create Recruiter B
        await request(server).post(recruiter_prefix + "/").send(recruiterB.serialize())
            .then(async res => {
                expect(res.status).to.be.equal(201);
                expect(await Recruiter.db.count({})).to.equal(1);
            });
        // get Recruiter B
        await request(server).get(recruiter_prefix + "/" + recruiterB.getId())
            .then(res => {
                expect(res.body).to.be.an('object');
                expect(res.body).deep.equals(recruiterB.serialize());
            });
        // expect failure when trying to get recruiter A
        await request(server).get(recruiter_prefix + "/" + recruiterA.getId())
            .then(async res => {
                expect(res.status).to.be.equal(404);
            });
    });

    // Update Specific Recruiter
    it('UPDATE /recruiter/:userid - update specific recruiter', async() => {
        // create recruiter A
        await request(server).post(recruiter_prefix + "/").send(recruiterA.serialize())
            .then(async res => {
                expect(res.status).to.be.equal(201);
                expect(await Recruiter.db.count({})).to.equal(1);
            });
        // Update recruiter
        recruiterA.setJobTitle("Machine Learning Engineer");
        await request(server).put(recruiter_prefix + "/" + recruiterA.getId()).send(recruiterA.serialize())
            .then(async res => {
                expect(res.status).to.be.equal(204);
            });
        // Update Non-existent recruiter
        await request(server).put(recruiter_prefix + "/" + recruiterB.getId()).send(recruiterB.serialize())
            .then(async res => {
                expect(res.status).to.be.equal(404);
            });
    });

    // Delete Specific Recruiter
    it('DELETE /recruiter/:userid - delete specific recruiter', async() => {
        // create recruiter B
        await request(server).post(recruiter_prefix + "/").send(recruiterB.serialize())
            .then(async res => {
                expect(res.status).to.be.equal(201);
                expect(await Recruiter.db.count({})).to.equal(1);
            });
        // delete recruiter B
        await request(server).delete(recruiter_prefix + "/" + recruiterB.getId())
            .then(res => {
                expect(res.status).to.be.equal(204);
            });
        // expect failure when trying to delete recruiter A
        await request(server).delete(recruiter_prefix + "/" + recruiterA.getId())
            .then(async res => {
                expect(res.status).to.be.equal(404);
            });
    });

});

/* ***** User (Only Login) ******* */

const user_prefix = '/user';
describe("User API (/user)", () => {
    // Reset database before all tests and after every test
    before(async () => {
        DBClient.connect();
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    afterEach(async () => {
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    it("POST /login - validate user login credentials", async() => {
        // create Applicant
        const serializedApplicant = applicantA.serialize();
        await request(server).post(applicant_prefix + "/").send(serializedApplicant)
            .then(async res => {
                    expect(res.status).to.be.equal(201);
                    expect(await Applicant.db.findOne({})).to.have.property("_id", serializedApplicant._id);
                });
        // validate login
        await request(server).post(user_prefix + "/login").send(serializedApplicant)
            .then(async res => {
                expect(res.status).to.be.equal(200);
                // Ensure there is a token
                expect(res.body).to.have.property('token');
            });
    });

});