import { expect } from 'chai';
import 'mocha';
import { AbstractDefaultDBCrudStrategy } from "./abstractDefaultDBCrudStrategy"
import { AbstractDBCrudBase } from "./abstractDBCrudBase";
import DBClient = require("./dbClient");

// define mock class that inherits from AbstractDBCrudBase
// TODO:
// define mock class that inherits from AbstractDefaultDBCrudStrategy 

describe('Database Interactions', () => {
    it('create', () => {
        expect.fail();
    });

    it('updateOne', () => {
        expect.fail();
    });

    it('updateMany', () => {
        expect.fail();
    });

    it('deleteOne', () => {
        expect.fail();
    });

    it('deleteMany', () => {
        expect.fail();
    });
});