import { AbstractDefaultDBCrudStrategy } from "../../db/abstractDefaultDBCrudStrategy";
import { CareerFair } from "./careerFair";
import { CareerFairDBSchema } from "./careerFairDBSchema";


class CareerFairDBStrategy extends AbstractDefaultDBCrudStrategy<CareerFairDBSchema>
{
    private static collectionName = "careerFair";

    public getCollectionName(): string {
        return CareerFairDBStrategy.collectionName;
    }
}

export { CareerFairDBStrategy };