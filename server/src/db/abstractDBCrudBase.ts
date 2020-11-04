import { IDBCrudStrategy } from './iDBCrudStrategy';

abstract class AbstractDBCrudBase
{
    protected dbCrudStrategy: IDBCrudStrategy;
}

export { AbstractDBCrudBase };