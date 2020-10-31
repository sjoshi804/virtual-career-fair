import { Console } from 'console';
import { Student } from '../student/student'

class Queue {
    private studentList: Array<Student>

    public constructor(students?: Array<Student>)
    {
        if (students == null)
        {
            this.studentList = new Array<Student>();
        }
        else
        {
            this.studentList = students;
        }
    }

    // Removes a given student from the queue
    public leaveQueue(student: Student)
    {
        if (this.isStudentInQueue(student))
        {
            this.studentList.splice(this.studentList.indexOf(student), 1);
        }
    }

    // Adds a student to the queue
    public joinQueue(student: Student)
    {
        if (!this.isStudentInQueue(student))
        {
            this.studentList.push(student);
            return true;
        }
        else
        {
            return false;
        }

    }

    // Dequeues the student at the front of the queue
    public dequeue()
    {
        var firstStudent = this.studentList.splice(0, 1)[0];
        return firstStudent;
    }

    // Get length of queue - to estimate wait time
    public getLength()
    {
        return this.studentList.length;
    }

    private isStudentInQueue(student: Student)
    {
        return (this.studentList.indexOf(student) != -1)
    }
}

export { Queue };