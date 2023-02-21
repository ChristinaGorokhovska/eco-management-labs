export {};
import mongoose, { Schema } from "mongoose";

interface IUnit {
  factoryId: Schema.Types.ObjectId;
  name: string;
}

export const UnitSchema = new Schema<IUnit>({
  factoryId: { type: Schema.Types.ObjectId, ref: "Factory" },
  name: { type: String, required: true },
});

const Unit = mongoose.model<IUnit>("Unit", UnitSchema, "unit");
export default Unit;
