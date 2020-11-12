import { expect, request } from 'chai';
import 'mocha';
import server from '../..';
import { Job } from '../job/job';
import { Recruiter } from '../user/recruiter';
import { Company } from './Company';
import chai = require('chai');
import chaiHttp = require('chai-http');
import { DBClient } from '../../db/dbClient';
import { testDatabaseName } from '../../.config';
import { v4 as uuid } from 'uuid';

// To use test HTTP API
chai.use(chaiHttp);

// Dummy objects to use in testing: Company, Recruiter
var companyA = new Company("compA", "", "", "");
var companyB = new Company("compB", "", "", "");
var companyC = new Company("compC", "", "", "");
var companyD = new Company("compD", "", "", "");
var companies = new Array<Company>(companyA, companyB, companyC, companyD);
var recruiterA = new Recruiter("recA", "", "", "");
recruiterA.setId(uuid());
var recruiterB = new Recruiter("recA", "", "", "");
recruiterB.setId(uuid());
var jobA = new Job("jobA");
var jobB = new Job("jobB");

// Test Company Class
describe("Company", () => {

    it('constructor', () => {
        expect(companyA).to.be.an.instanceOf(Company);
    });

    it('addRecruiterToCompany', () => {
        expect(companyA.addRecruiterToCompany(recruiterA));
        expect(companyA.getRecruiters()).to.contain(recruiterA);
    });

    it('addJobToCompany', () => {
        expect(companyA.addJobToCompany(jobA));
        expect(companyA.getJobs()).to.contain(jobA);
    });
});

// Test Company API
const prefix = "/company";
describe('Company API (/company)', () => {

    // Reset database before all tests and after every test
    before(async () => {
        DBClient.connect();
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    afterEach(async () => {
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });
    

    it('POST / - creates new company', async () => 
    {
        // Create one company
        const serializedCompany = companyA.serialize();
        await request(server).post(prefix + "/").send(serializedCompany)
            .then(
                async res => 
                {
                    expect(res.status).to.be.equal(201);
                    expect(await Company.db.findOne({})).to.have.property("_id", serializedCompany._id);
                }
            );
    });

    it('GET / - gets all companies', async () => 
    {
        // Create companyA-D
        for (var i = 0; i < companies.length; i++)
        {
            await request(server).post(prefix + "/").send(companies[i].serialize())
            .then(
                async res => 
                {
                    expect(res.status).to.be.equal(201);
                }
            );
        }
        // Confirm count of objects
        expect(await Company.db.count({})).to.be.equal(companies.length);

        // Get all 
        await request(server).get(prefix + "/")
            .then(
                res =>
                {
                    // Request success
                    expect(res.status).to.be.equal(200);
                    // Confirm all objects exist in list returned
                    companies.forEach(
                        company =>
                        {
                            // deep include to cross deep check values of object in array
                            expect(res.body).to.deep.include(company.serialize());
                        }
                    )
                }
            )
    });

    it('GET /:companyId - gets specific company', async () => 
    {
        // Create a company
        await request(server).post(prefix + "/").send(companyA.serialize())
            .then(
                async res => 
                {
                    expect(res.status).to.be.equal(201);
                    expect(await Company.db.count({})).to.equal(1);
                }
            );
        
        // Gets that company
        await request(server).get(prefix + "/" + companyA.getId())
            .then(
                res =>
                {
                    expect(res.body).to.be.an('object');
                    // Deep equals for object comparison
                    expect(res.body).deep.equals(companyA.serialize());
                }
            );
    });

    it('PUT /:companyId - updates specific company', async () => 
    {
        // Create a company
        await request(server).post(prefix + "/").send(companyA.serialize())
            .then(
                async res => 
                {
                    expect(res.status).to.be.equal(201);
                    expect(await Company.db.count({})).to.equal(1);
                }
            );
        
        // Update that company
        companyA.setDescription("blah");
        await request(server).put(prefix + "/" + companyA.getId()).send(companyA.serialize())
            .then(
                async res =>
                {
                    // Confirm request success
                    expect(res.status).equals(204);

                    // Confirm correct update (deep equals)
                    expect(await Company.db.findOne({})).deep.equals(companyA.serialize());
                }
            );
        
        // Update company that doesn't exist
        await request(server).put(prefix + "/" + companyB.getId()).send(companyB.serialize())
        .then(
            res =>
            {
                // Confirm request failure
                expect(res.status).equals(404);
            }
        );
    });

    it('DELETE /:companyId - updates specific company', async () => 
    {
        // Create a company
        await request(server).post(prefix + "/").send(companyA.serialize())
            .then(
                async res => 
                {
                    expect(res.status).to.be.equal(201);
                    expect(await Company.db.count({})).to.equal(1);
                }
            );
        
        // Delete that company
        await request(server).delete(prefix + "/" + companyA.getId())
            .then(
                async res =>
                {
                    // Confirm request success
                    expect(res.status).equals(204);

                    // Confirm correct update
                    expect(await Company.db.count({})).equals(0);
                }
            );
        
        // Delete object that doesn't exist
        await request(server).delete(prefix + "/" + companyB.getId())
            .then(
                res =>
                {
                    // Confirm request failure
                    expect(res.status).equals(404);
                }
            );
        
    });

    // POST to call function to add recruiter to company
    it('POST /:companyId/addRecruiter/:recruiterId - adds recruiter to company', async () => 
    {
        expect.fail("Not implemented.");
        //TODO: Waiting for recruiter db to be implemented
        // Create recruiter

        // Add to company

        // Try to recruiter that doesn't exist to company - confirm failure
    
    });

    // GET all recruiters for a company - returns recruiter schema objects
    it('GET /:companyId - updates specific company', async () => 
    {
        expect.fail("Not implemented.");

        //TODO:
        // Create recruiters
        

        // Add many to company

        // Try to recruiter that doesn't exist to company - confirm failure
    
    });
});
