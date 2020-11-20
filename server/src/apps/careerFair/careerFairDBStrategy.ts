import { AbstractDefaultDBCrudStrategy } from "../../db/abstractDefaultDBCrudStrategy";
import { CareerFair } from "./careerFair";


class CareerFairDBStrategy extends AbstractDefaultDBCrudStrategy<CareerFair>
{
    private static collectionName = "careerFair";

    public getCollectionName(): string {
        return CareerFairDBStrategy.collectionName;
    }
}

export { CareerFairDBStrategy };