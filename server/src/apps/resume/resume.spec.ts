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

});

// Test Resume API