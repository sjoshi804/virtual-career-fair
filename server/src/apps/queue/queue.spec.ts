import { Queue } from './queue'
import { expect } from 'chai';
import 'mocha';
import { Applicant } from '../user/applicant/applicant';

// Defining a queue of Applicants and some Applicants
var ApplicantQueue = new Queue();
var ApplicantA = new Applicant(0, "A", "", "", "", "Computer Science", 2021, "UCLA", "");
var ApplicantB = new Applicant(0, "B", "", "", "", "Math", 2022, "UCSB", "");
var ApplicantC = new Applicant(0, "C", "", "", "", "Biology", 2023, "Berkeley", "");

describe('Queue', () => {

  it('joinApplicants - should add Applicants', () => {
    ApplicantQueue.joinQueue("ApplicantA");
    ApplicantQueue.joinQueue("ApplicantB");
    ApplicantQueue.joinQueue("ApplicantC");
    const result = ApplicantQueue.getLength();
    expect(result).to.equal(3);
  });

  it('joinApplicants - should not add duplicate Applicant', () => {
    ApplicantQueue.joinQueue("ApplicantA");
    const result = ApplicantQueue.getLength();
    expect(result).to.equal(3);
  });

  it('dequeue - pop first element from queue and return it', () => {
    const result = ApplicantQueue.dequeue();
    expect(result).to.equal(ApplicantA);
    expect(ApplicantQueue.getLength()).to.equal(2);
  });

  it('leaveQueue - should remove Applicant from queue', () => {
    ApplicantQueue.leaveQueue("ApplicantB");
    const result = ApplicantQueue.getLength()
    expect(result).to.equal(1);
  });

  it('leaveQueue - should not error out if Applicant not in queue', () => {
    ApplicantQueue.leaveQueue("ApplicantA");
    const result = ApplicantQueue.getLength()
    expect(result).to.equal(1);
  });

  it('dequeue - error if dequeue from empty queue', () => {
    try
    {
      const result = (new Queue()).dequeue();
    }
    catch(err)
    {
      expect(true);
    }
  });
});