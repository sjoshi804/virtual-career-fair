import { expect, request } from 'chai';
import 'mocha';
import server from '../..';
import { Resume } from './resume';
import { Experience } from './experience';
import chai = require('chai');
import chaiHttp = require('chai-http');
import { DBClient } from '../../db/dbClient';
import { testDatabaseName } from '../../.config';
import { v4 as uuid } from 'uuid';

chai.use(chaiHttp);

var experienceA1 = new Experience('Jan 1', 'Feb 1', 'ucla', 'la', 'student researcher')
var experienceA2 = new Experience('March 1', 'May 1', 'ucla', 'la', 'software engineer')
var experiences = [experienceA1]
var resumeA = new Resume('12', ['sql'], experiences)

// Test Resume class
describe("Resume", () => {

    it('constructor', () => {
        expect(resumeA).to.be.an.instanceof(Resume);
    });

    it('addSkill', () => {
        expect(resumeA.addSkill('python'));
        expect(resumeA.getSkills()).to.contain('python');
    });

    it('addExperience', () => {
        expect(resumeA.addExperience(experienceA2));
        expect(resumeA.getExperiences()).to.contain(experienceA2);
    });

});

// Test Resume API
const prefix = "/resume";
describe('Resume API (/resume)', () => {
    // Reset database before all tests and after every test
    before(async () => {
        DBClient.connect();
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    afterEach(async () => {
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    it('POST /:applicantId - creates new resume', async () => {
        const serializedResume = resumeA.serialize();
        await request(server).post(prefix + "/12").send(serializedResume)
            .then(
                async res => 
                {
                    expect(res.status).to.be.equal(201);
                    expect(await Resume.db.findOne({})).to.have.property("_id", serializedResume._id);
                }
            );
    });

    it('GET /:applicantId - gets specific resume', async () => 
    {
        // Create a resume
        await request(server).post(prefix + "/12").send(resumeA.serialize())
            .then(
                async res => 
                {
                    expect(res.status).to.be.equal(201);
                    expect(await Resume.db.count({})).to.equal(1);
                }
            );
        
        // Gets that resume
        var insights: Array<string> = Resume.computeInsights(resumeA.getSkills(), resumeA.getExperiences())
        insights.forEach(insight => {
            resumeA.addInsight(insight)
        }); 
        await request(server).get(prefix + "/12")
            .then(
                res =>
                {
                    expect(res.body).to.be.an('object');
                    // Deep equals for object comparison
                    expect(res.body).deep.equals(resumeA.serialize());
                }
            );
    });

    it('PUT /:applicantId - updates specific resume', async () => 
    {
        // Create a resume
        await request(server).post(prefix + "/12").send(resumeA.serialize())
            .then(
                async res => 
                {
                    expect(res.status).to.be.equal(201);
                    expect(await Resume.db.count({})).to.equal(1);
                }
            );
        
        // Update that resume
        resumeA.addSkill("blah");
        await request(server).put(prefix + "/12").send(resumeA.serialize())
            .then(
                async res =>
                {
                    // Confirm request success
                    expect(res.status).equals(204);

                    // Confirm correct update (deep equals)
                    expect(await Resume.db.findOne({})).deep.equals(resumeA.serialize());
                }
            );
        
        // Update resume that doesn't exist
        await request(server).put(prefix + "/13").send(resumeA.serialize())
        .then(
            res =>
            {
                // Confirm request failure
                expect(res.status).equals(404);
            }
        );
    });

    it('DELETE /:applicantId - deletes specific company', async () => 
    {
        // Create a resume
        await request(server).post(prefix + "/12").send(resumeA.serialize())
            .then(
                async res => 
                {
                    expect(res.status).to.be.equal(201);
                    expect(await Resume.db.count({})).to.equal(1);
                }
            );
        
        // Delete that company
        await request(server).delete(prefix + "/12")
            .then(
                async res =>
                {
                    // Confirm request success
                    expect(res.status).equals(204);

                    // Confirm correct update
                    expect(await Resume.db.count({})).equals(0);
                }
            );
        
        // Delete object that doesn't exist
        await request(server).delete(prefix + "/13")
            .then(
                res =>
                {
                    // Confirm request failure
                    expect(res.status).equals(404);
                }
            );
    });

    it('GET /:applicantId/insights - get resume insights', async () => {
        // Create a resume
        await request(server).post(prefix + "/12").send(resumeA.serialize())
            .then(
                async res => 
                {
                    expect(res.status).to.be.equal(201);
                    expect(await Resume.db.count({})).to.equal(1);
                }
            );
        
        // Get insights for that resume
        await request(server).get(prefix + "/12/insights")
                .then(
                    async res =>
                    {   
                        // Confirm request success
                        expect(res.status).to.be.equal(200);

                        // Compare insights
                        expect(res.body).deep.equals(Resume.computeInsights(resumeA.getSkills(), resumeA.getExperiences()))
                    }
                );
    });
});