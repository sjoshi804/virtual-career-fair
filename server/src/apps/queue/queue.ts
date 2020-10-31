class Queue {
    studentList: Array<Student>
    leaveQueue(student: Student)
    {
        this.studentList.splice(this.studentList.indexOf(student));
    }

    joinQueue(student: Student)
    {
        this.studentList.push(student);
    }

    dequeue()
    {
        return this.studentList.splice(0);
    }
}