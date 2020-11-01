import { Queue } from './queue'
import { expect } from 'chai';
import 'mocha';
import { Student } from '../student/student';

// Defining a queue of students and some students
var studentQueue = new Queue();
var studentA = new Student("A");
var studentB = new Student("B");
var studentC = new Student("C");

describe('Queue', () => {

  it('joinStudents - should add students', () => {
    studentQueue.joinQueue(studentA);
    studentQueue.joinQueue(studentB);
    studentQueue.joinQueue(studentC);
    const result = studentQueue.getLength();
    expect(result).to.equal(3);
  });

  it('joinStudents - should not add duplicate student', () => {
    studentQueue.joinQueue(studentA);
    const result = studentQueue.getLength();
    expect(result).to.equal(3);
  });

  it('dequeue - pop first element from queue and return it', () => {
    const result = studentQueue.dequeue();
    expect(result).to.equal(studentA);
    expect(studentQueue.getLength()).to.equal(2);
  });

  it('leaveQueue - should remove student from queue', () => {
    studentQueue.leaveQueue(studentB);
    const result = studentQueue.getLength()
    expect(result).to.equal(1);
  });

  it('leaveQueue - should not error out if student not in queue', () => {
    studentQueue.leaveQueue(studentA);
    const result = studentQueue.getLength()
    expect(result).to.equal(1);
  });

});