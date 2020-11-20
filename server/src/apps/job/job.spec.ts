import { Job } from './job'
import { expect, request } from 'chai';
import 'mocha';
import server from '../..';
import chai = require('chai');
import chaiHttp = require('chai-http');
import { DBClient } from '../../db/dbClient';
import { testDatabaseName } from '../../.config';
import { v4 as uuid } from 'uuid';
import { Applicant } from '../user/applicant';
import { Company } from '../company/company';

// To use test HTTP API
chai.use(chaiHttp);

// Defining a job
var jobA = new Job("SDE1", "Entry level developer", new Array<string>("Computer Science", "Math"));
var jobB = new Job("ML Engineer1", "Entry level ML developer", new Array<string>("Computer Science", "Math", "Stats"));
var jobC = new Job("Data Scientist", "DS", new Array<string>("Computer Science", "Math", "Stats"));
var jobD = new Job("Data Scientist", "DS", new Array<string>("Computer Science", "Math", "Stats"));
var applicantAId = uuid();
var applicantBId = uuid();

var companyA = new Company("compA", "", "", "");
var companyB = new Company("compB", "", "", "");

describe('Job', () => {
    it('apply - should add applicant to list of applicants', () => {
        expect(jobD.apply(applicantAId));
        expect(jobD.apply(applicantBId));
        expect(jobD.getApplicantIds()).to.include(applicantAId);
        expect(jobD.getApplicantIds()).to.include(applicantBId);
    });

    it('apply - should not add duplicate applicant', () => {
        expect(!jobD.apply(applicantAId));
        expect(jobD.getApplicantIds()).length(2);
    });

    it('withdraw - remove applicant from applicants list', () => {
        expect(jobD.withdraw(applicantBId));
        expect(jobD.getApplicantIds()).to.not.include(applicantBId);
    });

    it('withdraw - do nothing and return false if applicant not in list', () => {
        expect(!jobD.withdraw("100"));
        expect(jobD.getApplicantIds()).length(1);
    });
});

// Test Job API
const prefix = "/company";

describe('Job API (/company)', () => {

    // Reset database before all tests and after every test
    before(async () => {
        DBClient.connect();
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    afterEach(async () => {
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    it('POST /:companyId/job - creates new job for a company', async () => 
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

        // Add jobs to company
        var serializedJobA = jobA.serialize();
        companyA.addJobToCompany(jobA)
        await request(server).post(prefix + "/" + companyA.getId() + "/job").send(serializedJobA)
            .then(
                async res =>
                {
                    expect(res.status).to.be.equal(204);
                    var company = await Company.db.findOne({"_id": serializedCompany._id});
                    expect(company).deep.equals(companyA.serialize());
                }
            )

        var serializedJobB = jobB.serialize();
        companyA.addJobToCompany(jobB)
        await request(server).post(prefix + "/" + companyA.getId() + "/job").send(serializedJobB)
            .then(
                async res =>
                {
                    expect(res.status).to.be.equal(204);
                    var company = await Company.db.findOne({"_id": serializedCompany._id});
                    expect(company).deep.equals(companyA.serialize());
                }
            )
        
        // Adding job to non-existent company should give a 404
        await request(server).post(prefix + "/12" + "/job").send(serializedJobB)
            .then(
                async res =>
                {
                    expect(res.status).equals(404);
                }
            )
    });

    it('GET /:companyId/job - Get all jobs for a company', async () => 
    {
        // Create one company
        const serializedCompany = companyB.serialize();
        await request(server).post(prefix + "/").send(serializedCompany)
            .then(
                async res => 
                {
                    expect(res.status).to.be.equal(201);
                    expect(await Company.db.findOne({})).to.have.property("_id", serializedCompany._id);
                }
            );

        // Add jobs to company
        var serializedJobA = jobA.serialize();
        await request(server).post(prefix + "/" + companyB.getId() + "/job").send(serializedJobA)
            .then(
                async res =>
                {
                    expect(res.status).to.be.equal(204);
                    var company = await Company.db.findOne({"_id": serializedCompany._id});
                    expect(company.jobs.length).equals(1);
                }
            )

        var serializedJobB = jobB.serialize();
        await request(server).post(prefix + "/" + companyB.getId() + "/job").send(serializedJobB)
            .then(
                async res =>
                {
                    expect(res.status).to.be.equal(204);
                    var company = await Company.db.findOne({"_id": serializedCompany._id});
                    expect(company.jobs.length).equals(2);
                }
            )
        
        await request(server).get(prefix + "/" + companyB.getId() + "/job")
        .then(
            async res =>
            {
                expect(res.status).to.be.equal(200);
                expect(res.body.length).equals(2);
            }
        )

        
    });

    it('Get /:companyId/job/:jobId - get specific job from company', async () => 
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

        // Get the job
        const serializedJobA = jobA.serialize()
        await request(server).get(prefix + "/" + companyA.getId() + "/job/" + jobA.getId())
                .then(
                    async res =>
                    {
                        expect(res.status).to.be.equal(200);
                        expect(res.body).deep.equals(serializedJobA);
                    }
                )
        
        // Get a 404 when job does not exist
        await request(server).get(prefix + "/" + companyA.getId() + "/job/12")
                .then(
                    async res =>
                    {
                        expect(res.status).to.be.equal(404);
                    }
                )
    });

    it('PUT /:companyId/job/:jobId - update specific job from company', async () => 
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

        // update the job
        const serializedJobA = jobA.serialize()
        await request(server).put(prefix + "/" + companyA.getId() + "/job/" + jobA.getId()).send(jobC.serialize())
                .then(
                    async res =>
                    {
                        expect(res.status).to.be.equal(204);
                        var company = await Company.db.findOne({"_id": serializedCompany._id})
                        var tempCompany = new Company("compA", "", "", "");
                        tempCompany.addJobToCompany(jobC)
                        tempCompany.addJobToCompany(jobB)
                        tempCompany.setId(company._id)
                        expect(company).deep.equals(tempCompany.serialize());
                    }
                )
        
        // Get a 404 when job does not exist
        await request(server).get(prefix + "/" + companyA.getId() + "/job/12")
                .then(
                    async res =>
                    {
                        expect(res.status).to.be.equal(404);
                    }
                )
    });

    it('DELETE /:companyId/job/:jobId - delete specific job from company', async () => 
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
        
        // Delete Job A
        await request(server).delete(prefix + "/" + companyA.getId() + "/job/" + jobA.getId())
                .then(
                    async res =>
                    {
                        expect(res.status).to.be.equal(204);
                        var company = await Company.db.findOne({"_id": companyA.getId()})
                        expect(company.jobs.length).equals(1);
                    }
                )
        
        // Delete Job B
        await request(server).delete(prefix + "/" + companyA.getId() + "/job/" + jobB.getId())
                .then(
                    async res =>
                    {
                        expect(res.status).to.be.equal(204);
                        var company = await Company.db.findOne({"_id": companyA.getId()})
                        expect(company.jobs.length).equals(0);
                    }
                )

        // Attempt to delete Job C but get 404
        await request(server).delete(prefix + "/" + companyA.getId() + "/job/" + jobC.getId())
                .then(
                    async res =>
                    {
                        expect(res.status).to.be.equal(404);
                    }
                )
    });

    it('POST /:companyId/job/:jobId/apply/:applicantId - add applicant to specific job', async () => 
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

        // Add applicantId (random applicantId = 12) to first job
        await request(server).post(prefix + "/" + companyA.getId() + "/job/" + companyA.getJobs()[0].getId() + "/apply/12")
                .then(
                    async res => {
                        expect(res.status).to.be.equal(201);
                        var company = await Company.db.findOne({"_id": companyA.getId()})
                        expect(company.jobs[0].applicantIds.length).equals(1); // There should be one applicant
                    }
                )
    });

    it('POST /:companyId/job/:jobId/withdraw/:applicantId - delete applicant from specific job', async () => 
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

        // Add applicantId (random applicantId = 12) to first job
        await request(server).post(prefix + "/" + companyA.getId() + "/job/" + companyA.getJobs()[0].getId() + "/apply/12")
                .then(
                    async res => {
                        expect(res.status).to.be.equal(201);
                        var company = await Company.db.findOne({"_id": companyA.getId()})
                        expect(company.jobs[0].applicantIds.length).equals(1); // There should be one applicant
                    }
                )

        // Delete applicant 12 from jobA and expect length to be 0
        await request(server).post(prefix + "/" + companyA.getId() + "/job/" + companyA.getJobs()[0].getId() + "/withdraw/12")
                .then(
                    async res => {
                        expect(res.status).to.be.equal(201);
                        var company = await Company.db.findOne({"_id": companyA.getId()})
                        expect(company.jobs[0].applicantIds.length).equals(0);
                    }
                )
    });
});