export {};
import mongoose, { Schema } from "mongoose";

export interface IRecord {
  year: number;
  unitId: Schema.Types.ObjectId;
  indicatorId: Schema.Types.ObjectId;

  monthes: {
    december: number;
    january: number;
    february: number;
    march: number;
    april: number;
    may: number;
    june: number;
    july: number;
    august: number;
    september: number;
    october: number;
    november: number;
  };
}

export const RecordSchema = new Schema<IRecord>({
  year: { type: Number, required: true },

  unitId: { type: Schema.Types.ObjectId, ref: "Unit" },
  indicatorId: { type: Schema.Types.ObjectId, ref: "User" },
  monthes: {
    december: { type: Number, default: 0 },
    january: { type: Number, default: 0 },
    february: { type: Number, default: 0 },
    march: { type: Number, default: 0 },
    april: { type: Number, default: 0 },
    may: { type: Number, default: 0 },
    june: { type: Number, default: 0 },
    july: { type: Number, default: 0 },
    august: { type: Number, default: 0 },
    september: { type: Number, default: 0 },
    october: { type: Number, default: 0 },
    november: { type: Number, default: 0 },
  },
});

const Record = mongoose.model<IRecord>("Record", RecordSchema, "record");

export default Record;
