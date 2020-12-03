import { Booth } from './booth'
import { CareerFair } from '../careerFair/careerFair'
import { expect, request } from 'chai';
import 'mocha';
import server from '../..';
import chai = require('chai');
import chaiHttp = require('chai-http');
import { DBClient } from '../../db/dbClient';
import { testDatabaseName } from '../../.config';
import { v4 as uuid } from 'uuid';
import { Company } from '../company/company';
import { BoothDBSchema } from './boothDBSchema';

// To use test HTTP API
chai.use(chaiHttp);

var companyA = new Company("compA", "", "", "");
companyA.serialize();

var cf = new CareerFair(undefined, "ucla", new Date(2020, 11, 2, 3, 0, 0), new Date(2020, 11, 2, 5, 0, 0),
    [], [], new Map<string, Booth>());

const prefix = "/api/careerfair";

describe('Booth API (/company)', () => {

    // Reset database before all tests and after every test
    before(async () => {
        DBClient.connect();
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    afterEach(async () => {
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    // it('POST /:careerfairid/company - creates new booth for a company', async () => 
    // {

    // });

    it('POST /:careerfairid/company/:companyid - gets booth', async () => 
    {
        const serializedCareerFair = cf.serialize();
        await request(server).post(prefix + "/").send(serializedCareerFair)
            .then(
                async res => 
                {
                    expect(res.status).to.be.equal(201);
                    expect(await CareerFair.db.findOne({})).to.have.property("_id", serializedCareerFair._id);
                }
            );
        var booth = new Booth(undefined, cf.getId(), companyA.getId());
        var serializedBooth = booth.serialize()
        await request(server).post(prefix + "/" +  cf.getId() + "/company/" + companyA.getId()).send(serializedBooth)
        .then(
            async res => 
            {
                expect(res.status).to.be.equal(201);
                var c = await CareerFair.db.findOne({"_id" : serializedCareerFair._id});
                // expect(c.booths.size).equals(1);
            }
        );

        await request(server).get(prefix + "/" +  cf.getId() + "/company/" + companyA.getId())
        .then(
            async res => 
            {
                expect(res.status).to.be.equal(200);
                expect(res.body.companyId).equals(companyA.getId())
            }
        );
    });

    it('DELETE /:careerfairid/company/:companyid - deletes booth', async () => 
    {
        const serializedCareerFair = cf.serialize();
        await request(server).post(prefix + "/").send(serializedCareerFair)
            .then(
                async res => 
                {
                    expect(res.status).to.be.equal(201);
                    expect(await CareerFair.db.findOne({})).to.have.property("_id", serializedCareerFair._id);
                }
            );
        var booth = new Booth(undefined, cf.getId(), companyA.getId());
        var serializedBooth = booth.serialize()
        await request(server).post(prefix + "/" +  cf.getId() + "/company/" + companyA.getId()).send(serializedBooth)
        .then(
            async res => 
            {
                expect(res.status).to.be.equal(201);
                var c = await CareerFair.db.findOne({"_id" : serializedCareerFair._id});
                // expect(c.booths.size).equals(1);
            }
        );

        await request(server).delete(prefix + "/" +  cf.getId() + "/company/" + companyA.getId())
        .then(
            async res => 
            {
                expect(res.status).to.be.equal(201);
                var c = await CareerFair.db.findOne({"_id" : serializedCareerFair._id});
                // expect(c.booths).equals({})
            }
        );
    });
});