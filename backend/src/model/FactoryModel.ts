export {};
import mongoose, { Schema } from "mongoose";

interface IFactory {
  name: string;
  description: string;
}

export const FactorySchema = new Schema<IFactory>({
  name: { type: String, required: true },
  description: String,
});

const Factory = mongoose.model<IFactory>("Factory", FactorySchema, "factory");
export default Factory;
