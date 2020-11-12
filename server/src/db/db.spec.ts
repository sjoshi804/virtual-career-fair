import { doesNotMatch } from 'assert';
import { expect } from 'chai';
import 'mocha';
import { Db } from 'mongodb';
import { testDatabaseName } from '../.config';
import { AbstractDefaultDBCrudStrategy } from "./abstractDefaultDBCrudStrategy";
import { DBClient } from './dbClient';
import { ISerializable } from './iSerializable';

/*
    Test and Reference for Pattern to use DB
*/

// Mock class db strategy
class MockClassDBStrategy extends AbstractDefaultDBCrudStrategy<MockClass>
{
    public getCollectionName(): string {
        return "test";
    }
}

// Mock class that interacts with db
class MockClass implements ISerializable
{
    public a: boolean;
    public b: boolean;

    public static db = new MockClassDBStrategy();

    public constructor(a: boolean, b: boolean)
    {
        this.a = a;
        this.b = b;
    }

    public serialize()
    {
        return new MockClassDBSchema(this);
    }
}

// Mock class model to whittle down fields
class MockClassDBSchema
{
    public a: boolean;

    constructor(obj: MockClass)
    {
        this.a = obj.a;
    }
}


/*
    Test Cases
*/

describe('Database Interactions', () => {

    // Setup connection and reset db
    before(async () =>  {
        await DBClient.connect();
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });
    
    // Reset by dropping db
    afterEach(async () =>  {
        await DBClient.mongoClient.db(testDatabaseName).dropDatabase();
    });

    it('save', async () => {
        expect(await MockClass.db.save(new MockClass(false, false))).to.be.true;
    });

    // Define filterQuery and updateQuery for remaining ops
    const filterQueryAFalse = 
    {
        a: false
    }
    const filterQueryATrue = 
    {
        a: true
    }
    const updateQueryATrue = 
    { 
        $set: {a: true}
    };
    const updateQueryAFalse = 
    { 
        $set: {a: false}
    };

    it('count', async () => {
        expect(await MockClass.db.save(new MockClass(false, false)));
        expect(await MockClass.db.count({a: false})).to.be.equal(1);
    });

    it('updateOne', async () => {
        expect(await MockClass.db.save(new MockClass(false, false))).to.be.true;
        expect(await MockClass.db.save(new MockClass(false, false))).to.be.true;
        expect(await MockClass.db.count(filterQueryAFalse)).to.be.equal(2);
        expect(await MockClass.db.updateOne(filterQueryAFalse, updateQueryATrue)).to.be.true;
        expect(await MockClass.db.count(filterQueryAFalse)).to.be.equal(1);
        expect(await MockClass.db.updateOne(filterQueryATrue, updateQueryAFalse)).to.be.true;
    });

    it('updateMany', async () => {
        expect(await MockClass.db.save(new MockClass(false, false))).to.be.true;
        expect(await MockClass.db.save(new MockClass(false, false))).to.be.true;
        expect(await MockClass.db.updateMany(filterQueryAFalse, updateQueryATrue)).to.be.true;
        expect(await MockClass.db.count(filterQueryATrue)).to.be.equal(2);
    });

    
    it('findOne', async () => {
        expect(await MockClass.db.save(new MockClass(true, false))).to.be.true;
        expect(await MockClass.db.save(new MockClass(true, false))).to.be.true;
        expect((await MockClass.db.findOne(filterQueryATrue)).a).to.be.true;
    });

    it('findMany', async () => {
        expect(await MockClass.db.save(new MockClass(true, false))).to.be.true;
        expect(await MockClass.db.save(new MockClass(true, false))).to.be.true;
        const documents = await MockClass.db.findMany(filterQueryATrue);
        expect(documents.length).to.be.equal(2);
        expect(documents[0].a && documents[0].a).to.be.true;
    });

    it('deleteOne', async () => {
        expect(await MockClass.db.save(new MockClass(true, false))).to.be.true;
        expect(await MockClass.db.save(new MockClass(true, false))).to.be.true;
        expect(await MockClass.db.deleteOne(filterQueryATrue)).to.be.true;
        expect(await MockClass.db.count(filterQueryATrue)).to.be.equal(1);
    });

    it('deleteMany', async () => {
        expect(await MockClass.db.save(new MockClass(true, false))).to.be.true;
        expect(await MockClass.db.save(new MockClass(true, false))).to.be.true;
        expect(await MockClass.db.save(new MockClass(false, false))).to.be.true;
        expect(await MockClass.db.deleteMany(filterQueryATrue)).to.be.true;
        expect(await MockClass.db.count({})).to.be.equal(1);
    });
});