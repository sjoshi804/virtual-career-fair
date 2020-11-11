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

// To use test HTTP API
chai.use(chaiHttp);

// Dummy objects to use in testing: Company, Recruiter
var companyA = new Company("compA", "", "", "");
var companyB = new Company("compB", "", "", "");
var companyC = new Company("compC", "", "", "");
var companyD = new Company("compD", "", "", "");
var recruiterA = new Recruiter("recA", "", "", "");
recruiterA.setId("recA");
var recruiterB = new Recruiter("recA", "", "", "");
recruiterB.setId("recB");
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
const prefix = "/company"
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
        // Create one note using post
        await request(server).post(prefix + "/").send(companyA)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await Company.db.count({})).to.equal(1);
                }
            );
    });

    it('GET / - gets all companies', async () => 
    {
        // Create companyA-D
        await request(server).post(prefix + "/").send(companyA)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await Company.db.count({})).to.equal(1);
                }
            );
        await request(server).post(prefix + "/").send(companyB)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await Company.db.count({})).to.equal(2);
                }
            );
        await request(server).post(prefix + "/").send(companyC)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await Company.db.count({})).to.equal(3);
                }
            );
        await request(server).post(prefix + "/").send(companyD)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await Company.db.count({})).to.equal(4);
                }
            );
    });
});
