import constants = require("../../constants")

class DummyClass {
    id: number;

    constructor(id) {
        this.id = id;
    }

    do() {
        let f = function(req, res) {
            console.log('Log')
        }
        return f
    }
}

export {DummyClass as DummyClass}

// module.exports = {
//     Goal: Goal,
//     Project: Project,
//     Task: Task
// }