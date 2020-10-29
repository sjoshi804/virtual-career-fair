const constants = require('./constants');

// Goal class and constructor
class DummyClass {
    constructor(id) {
        this.id = id;
    }
}

module.exports = {
    Goal: Goal,
    Project: Project,
    Task: Task
}