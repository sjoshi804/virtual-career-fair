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
const prefix = "resume";
describe('Resume API (/resume)', () => {
    // Reset database before all tests and after every test
    before(async () => {
        DBClient.connect();
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    afterEach(async () => {
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    it('GET / - get resumes', async () => 
    {
        await request(server).get(prefix + "/").send({})
            .then(
                async res => 
                {
                    expect(res.status).to.be.equal(201);
                    // expect(await Resume.db.findOne({})).to.have.property("_id", serializedResume._id);
                }
            );
    });

    it('POST /:applicantId - creates new resume', async () => 
    {
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
});