import { ISerializable } from "../../db/iSerializable";
import { CareerFairDBStrategy } from "./careerFairDBStrategy";

class CareerFair implements ISerializable
{
    public serialize() {
        throw new Error("Method not implemented.");
    }

    public static db = new CareerFairDBStrategy();

}

export { CareerFair }