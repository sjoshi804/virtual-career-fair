import { Job } from './job'
import { expect } from 'chai';
import 'mocha';
import { Applicant } from '../user/applicant';
import { Company } from '../company/company';

// Defining a job
var job = new Job("1", "SDE", new Company("JobZ"));
var alice = new Applicant("Alice", "alice@example.com", "hashedpassword", "aliceToken");
var bob = new Applicant("Bob", "bob@example.com", "hashedpassword", "bobToken");
var expectedApplicants = new Array(alice, bob);

describe('Job', () => {
    it('apply - should add applicant to list of applicants', () => {
        expect(job.apply(alice));
        expect(job.apply(bob));
        expect(job.getApplicants()).to.include(alice);
        expect(job.getApplicants()).to.include(bob);
    });

    it('apply - should not add duplicate applicant', () => {
        expect(!job.apply(alice));
        expect(job.getApplicants()).length(2);
    });

    it('withdraw - remove applicant from applicants list', () => {
        expect(job.withdraw(bob));
        expect(job.getApplicants()).to.not.include(bob);
    });

    it('withdraw - do nothing and return false if applicant not in list', () => {
        expect(!job.withdraw(new Applicant("Charlie", "charlie@example.com", "hashedPassword", "charlieToken")));
        expect(job.getApplicants()).length(1);
    });
});