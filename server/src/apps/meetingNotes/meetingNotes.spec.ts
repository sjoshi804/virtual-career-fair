import { expect, request } from 'chai';
import 'mocha';
import server from '../..';
import { MeetingNotes } from './meetingNotes';
import chai = require('chai');
import chaiHttp = require('chai-http');
import { DBClient } from '../../db/dbClient';
import { testDatabaseName } from '../../.config';
import { isSubsetOf } from 'is-subset-of';

// To use test HTTP API
chai.use(chaiHttp);

// Dummy meeting note to use
const noteA = new MeetingNotes("rec-1", "app-1", "company-1", "careerFair-1", "")
const noteB = new MeetingNotes("rec-1", "app-2", "company-1", "careerFair-1", "");
const noteC = new MeetingNotes("rec-1", "app-1", "company-1", "careerFair-2", "");
const noteD = new MeetingNotes("rec-1", "app-1", "company-2", "careerFair-1", "");

// Test MeetingNotes
describe('MeetingNotes', () => {

    it('constructor', () => {
        expect(noteA).to.be.an.instanceOf(MeetingNotes);
    });

    it('serialize - returns itself', () => {
        expect(noteB.serialize()).to.be.an.instanceOf(MeetingNotes);
        expect(noteB.serialize()).to.haveOwnProperty("recruiterId", "rec-1");
        expect(noteB.serialize()).to.haveOwnProperty("applicantId", "app-2");
        expect(noteB.serialize()).to.haveOwnProperty("companyId", "company-1");
        expect(noteB.serialize()).to.haveOwnProperty("careerFairId", "careerFair-1");
        expect(noteB.serialize()).to.haveOwnProperty("notes", "");
    });
});

// Test MeetingNotes API


describe('MeetingNotes API (/meetingnotes)', () => {

    // Reset database before all tests and after every test
    before(async () => {
        DBClient.connect();
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    afterEach(async () => {
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    const prefix = "/api/meetingnotes";
    it('POST / - creates new note', async () => 
    {
        // Create one note using post
        await request(server).post(prefix + "/").send(noteA)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(1);
                }
            );
    });
    
    it('GET /company/:companyId - gets all meeting notes for a company ', async () => 
    {
        // Create noteA-D
        await request(server).post(prefix + "/").send(noteA)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(1);
                }
            );
        
        await request(server).post(prefix + "/").send(noteB)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(2);
                }
            );

        await request(server).post(prefix + "/").send(noteC)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(3);
                }
            );

        await request(server).post(prefix + "/").send(noteD)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(4);
                }
            );
        
        // Confirm that notes filtered by company
        await request(server).get(prefix + "/company/company-1")
            .then(
                async res =>
                {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a('Array');
                    expect(res.body.length).to.be.equal(3);
                    res.body.forEach(element => {
                        expect(
                            isSubsetOf(noteA, element) ||
                            isSubsetOf(noteB, element) ||
                            isSubsetOf(noteC, element)
                        ).to.be.true;
                    });
                }
            );          

        await request(server).get(prefix + "/company/company-2")
            .then(
                async res =>
                {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a('Array');
                    expect(res.body.length).to.be.equal(1);
                    expect(isSubsetOf(noteD, res.body[0])).to.be.true;
                }
            );   
        
    });
    
    it('GET /company/:companyId/applicant/:applicantId - gets all notes for company on a given applicant', async () => 
    {
        // Create notesA-D
        await request(server).post(prefix + "/").send(noteA)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(1);
                }
            );
        
        await request(server).post(prefix + "/").send(noteB)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(2);
                }
            );

        await request(server).post(prefix + "/").send(noteC)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(3);
                }
            );

        await request(server).post(prefix + "/").send(noteD)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(4);
                }
            );

        // Confirm that notes are filtered by company and applicant 
        await request(server).get(prefix + "/company/company-1/applicant/app-1")
            .then(
                async res =>
                {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a('Array');
                    expect(res.body.length).to.be.equal(2);
                    res.body.forEach(element => {
                        expect(
                            isSubsetOf(noteA, element) ||
                            isSubsetOf(noteC, element)
                        ).to.be.true;
                    });
                }
            );          

        await request(server).get(prefix + "/company/company-1/applicant/app-2")
            .then(
                async res =>
                {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a('Array');
                    expect(res.body.length).to.be.equal(1);
                    expect(isSubsetOf(noteB, res.body[0])).to.be.true;
                }
            );   
        
    });


    it('GET /company/:companyId/careerfair/:careerFairId - gets all notes for company from a given career fair', async () => 
    {
        // Create notesA-D
        await request(server).post(prefix + "/").send(noteA)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(1);
                }
            );
        
        await request(server).post(prefix + "/").send(noteB)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(2);
                }
            );

        await request(server).post(prefix + "/").send(noteC)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(3);
                }
            );

        await request(server).post(prefix + "/").send(noteD)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(4);
                }
            );

        // Confirm that notes are filtered by career fair
        await request(server).get(prefix + "/company/company-1/careerfair/careerfair-1")
            .then(
                async res =>
                {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a('Array');
                    expect(res.body.length).to.be.equal(2);
                    res.body.forEach(element => {
                        expect(
                            isSubsetOf(noteA, element) ||
                            isSubsetOf(noteB, element)
                        ).to.be.true;
                    });
                }
            );          

        await request(server).get(prefix + "/company/company-1/careerfair/careerfair-2")
            .then(
                async res =>
                {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a('Array');
                    expect(res.body.length).to.be.equal(1);
                    expect(isSubsetOf(noteC, res.body[0])).to.be.true;
                }
            );   
        
    });

    it('GET /company/:companyId/careerfair/:careerFairId/applicant/:applicantId', async () => 
    {
        // Create notesA-D
        await request(server).post(prefix + "/").send(noteA)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(1);
                }
            );
        
        await request(server).post(prefix + "/").send(noteB)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(2);
                }
            );

        await request(server).post(prefix + "/").send(noteC)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(3);
                }
            );

        await request(server).post(prefix + "/").send(noteD)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(4);
                }
            );

        // Confirm notesA-D can be retrieved individually
        await request(server)
        .get(prefix + "/company/" + noteA.companyId + "/careerfair/" + noteA.careerFairId + "/applicant/" + noteA.applicantId)
        .then( 
            async res =>
            {
                expect(res.body).to.be.a('object');
                expect(res.status).to.be.equal(200);
                expect(isSubsetOf(noteA, res.body))
            }
        );

        await request(server)
        .get(prefix + "/company/" + noteB.companyId + "/careerfair/" + noteB.careerFairId + "/applicant/" + noteB.applicantId)
        .then( 
            async res =>
            {
                expect(res.body).to.be.a('object');
                expect(res.status).to.be.equal(200);
                expect(isSubsetOf(noteB, res.body))
            }
        );

        await request(server)
        .get(prefix + "/company/" + noteC.companyId + "/careerfair/" + noteC.careerFairId + "/applicant/" + noteC.applicantId)
        .then( 
            async res =>
            {
                expect(res.body).to.be.a('object');
                expect(res.status).to.be.equal(200);
                expect(isSubsetOf(noteC, res.body))
            }
        );

        await request(server)
        .get(prefix + "/company/" + noteD.companyId + "/careerfair/" + noteD.careerFairId + "/applicant/" + noteD.applicantId)
        .then( 
            async res =>
            {
                expect(res.body).to.be.a('object');
                expect(res.status).to.be.equal(200);
                expect(isSubsetOf(noteD, res.body))
            }
        );

    });

    
    it('UPDATE /company/:companyId/careerfair/:careerFairId/applicant/:applicantId - can ONLY be used to update notes', async () => 
    {
        // Create noteA
        await request(server).post(prefix + "/").send(noteA)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(await MeetingNotes.db.count({})).to.equal(1);
                }
            );
        
        // Update noteA.notes
        await request(server).patch(prefix + "/company/" + noteA.companyId + "/careerfair/" + noteA.careerFairId + "/applicant/" + noteA.applicantId)
            .send({notes: "This is a note."})
            .then(
                async res =>
                {
                    // Confirm success of update request
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);

                    // Confirm update noteA.notes
                    noteA.notes = "This is a note.";
                    expect(await MeetingNotes.db.findOne(noteA)).to.haveOwnProperty("notes", "This is a note.");
                }
            );
        
        // Attempt to update other fields
        await request(server).patch(prefix + "/company/" + noteA.companyId + "/careerfair/" + noteA.careerFairId + "/applicant/" + noteA.applicantId)
            .send({notes: "This is a note.", applicantId: "blah"})
            .then(
                async res =>
                {
                    // Confirm failure of request
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.false;
                    expect(res.status).to.be.equal(200);

                    // Confirm nothing has changed
                    noteA.notes = "This is a note.";
                    expect(isSubsetOf(noteA, await MeetingNotes.db.findOne(noteA))).to.be.true;
                    
                }
            );
    });

    it('DELETE /company/:companyId/careerfair/:careerFairId/applicant/:applicantId', async () => 
    {
        // Create notesA-D
        await request(server).post(prefix + "/").send(noteA)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(1);
                }
            );
        
        await request(server).post(prefix + "/").send(noteB)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(2);
                }
            );

        await request(server).post(prefix + "/").send(noteC)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(3);
                }
            );

        await request(server).post(prefix + "/").send(noteD)
            .then(
                async res => 
                {
                    expect(res.body).to.be.a('object');
                    expect(res.body.success).to.be.true;
                    expect(res.status).to.be.equal(200);
                    expect(await MeetingNotes.db.count({})).to.equal(4);
                }
            );


        // Delete notesA-D individually
        await request(server)
        .delete(prefix + "/company/" + noteA.companyId + "/careerfair/" + noteA.careerFairId + "/applicant/" + noteA.applicantId)
        .then( 
            async res =>
            {
                // Confirm request success
                expect(res.body).to.be.a('object');
                expect(res.status).to.be.equal(200);
                expect(res.body.success).to.be.true;
                expect(await MeetingNotes.db.count(noteA)).to.be.equal(0);
            }
        );

        await request(server)
        .delete(prefix + "/company/" + noteB.companyId + "/careerfair/" + noteB.careerFairId + "/applicant/" + noteB.applicantId)
        .then( 
            async res =>
            {
                // Confirm request success                
                expect(res.body).to.be.a('object');
                expect(res.status).to.be.equal(200);
                expect(res.body.success).to.be.true;

                // Confirm deletion
                expect(await MeetingNotes.db.count(noteB)).to.be.equal(0);
            }
        );

        await request(server)
        .delete(prefix + "/company/" + noteC.companyId + "/careerfair/" + noteC.careerFairId + "/applicant/" + noteC.applicantId)
        .then( 
            async res =>
            {
                // Confirm request success
                expect(res.body).to.be.a('object');
                expect(res.status).to.be.equal(200);
                expect(res.body.success).to.be.true;

                // Confirm deletion
                expect(await MeetingNotes.db.count(noteC)).to.be.equal(0);
            }
        );

        await request(server)
        .delete(prefix + "/company/" + noteD.companyId + "/careerfair/" + noteD.careerFairId + "/applicant/" + noteD.applicantId)
        .then( 
            async res =>
            {
                // Confirm request success
                expect(res.body).to.be.a('object');
                expect(res.status).to.be.equal(200);
                expect(res.body.success).to.be.true;

                // Confirm deletion
                expect(await MeetingNotes.db.count(noteD)).to.be.equal(0);
            }
        );
    }); 
});