import { Job } from './job'
import { expect } from 'chai';
import 'mocha';
import { Applicant } from '../applicant/applicant';
import { Company } from '../company/company';

// Defining a job
var job = new Job("1", "SDE", new Company("JobZ"));
var alice = new Applicant("Alice");
var bob = new Applicant("Bob");
var expectedApplicants = new Array(alice, bob);

describe('Job', () => {
    it('apply - should add applicant to list of applicants', () => {
        expect(job.apply(alice));
        expect(job.apply(bob));
        expect(job.getApplicants()).equal(expectedApplicants);
    });

    it('apply - should not add duplicate applicant', () => {
        expect(!job.apply(alice));
        expect(job.getApplicants()).equal(expectedApplicants);
    });

    it('withdraw - remove applicant from applicants list', () => {
        expect(job.withdraw(bob));
        expect(job.getApplicants()).equal(new Array<Applicant>(alice));
    });

    it('withdraw - do nothing and return false if applicant not in list', () => {
        expect(!job.withdraw(new Applicant("Charlie")));
        expect(job.getApplicants()).equal(new Array<Applicant>(alice));
    });
});