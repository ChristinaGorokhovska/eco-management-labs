export {};
import mongoose, { Schema } from "mongoose";

interface IIndicator {
  name: String;
  price: Number;
}

export const IndicatorSchema = new Schema<IIndicator>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Indicator = mongoose.model<IIndicator>("Indicator", IndicatorSchema, "indicator");
export default Indicator;
