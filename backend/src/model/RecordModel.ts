export {};
import mongoose, { Schema } from "mongoose";

export interface IRecord {
  year: number;
  unitId: Schema.Types.ObjectId;
  indicatorId: Schema.Types.ObjectId;
  factoryId: Schema.Types.ObjectId;

  monthes: {
    december: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    january: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    february: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    march: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    april: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    may: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    june: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    july: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    august: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    september: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    october: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
    november: {
      value: number;
      workDays: number;
      dailyAvg: number;
    };
  };
}

export const RecordSchema = new Schema<IRecord>({
  year: { type: Number, required: true },
  unitId: { type: Schema.Types.ObjectId, ref: "Unit" },
  indicatorId: { type: Schema.Types.ObjectId, ref: "User" },

  monthes: {
    december: {
      value: { type: Number, default: 0 },
      workDays: { type: Number, default: 0 },
      dailyAvg: {
        type: Number,
      },
    },
    january: {
      value: { type: Number, default: 0 },
      workDays: { type: Number, default: 0 },
      dailyAvg: {
        type: Number,
      },
    },
    february: {
      value: { type: Number, default: 0 },
      workDays: { type: Number, default: 0 },
      dailyAvg: {
        type: Number,
        default: function () {
          this.value / this.workDays;
        },
      },
    },
    march: {
      value: { type: Number, default: 0 },
      workDays: { type: Number, default: 0 },
      dailyAvg: {
        type: Number,
        default: function () {
          this.value / this.workDays;
        },
      },
    },
    april: {
      value: { type: Number, default: 0 },
      workDays: { type: Number, default: 0 },
      dailyAvg: {
        type: Number,
      },
    },
    may: {
      value: { type: Number, default: 0 },
      workDays: { type: Number, default: 0 },
      dailyAvg: {
        type: Number,
      },
    },
    june: {
      value: { type: Number, default: 0 },
      workDays: { type: Number, default: 0 },
      dailyAvg: {
        type: Number,
      },
    },
    july: {
      value: { type: Number, default: 0 },
      workDays: { type: Number, default: 0 },
      dailyAvg: {
        type: Number,
      },
    },
    august: {
      value: { type: Number, default: 0 },
      workDays: { type: Number, default: 0 },
      dailyAvg: {
        type: Number,
      },
    },
    september: {
      value: { type: Number, default: 0 },
      workDays: { type: Number, default: 0 },
      dailyAvg: {
        type: Number,
      },
    },
    october: {
      value: { type: Number, default: 0 },
      workDays: { type: Number, default: 0 },
      dailyAvg: {
        type: Number,
      },
    },
    november: {
      value: { type: Number, default: 0 },
      workDays: { type: Number, default: 0 },
      dailyAvg: {
        type: Number,
      },
    },
  },
}).pre("save", function (next) {
  this.monthes.december.dailyAvg = +(this.monthes.december.value / this.monthes.december.workDays).toFixed(2);
  this.monthes.january.dailyAvg = +(this.monthes.january.value / this.monthes.january.workDays).toFixed(2);
  this.monthes.february.dailyAvg = +(this.monthes.february.value / this.monthes.february.workDays).toFixed(2);
  this.monthes.march.dailyAvg = +(this.monthes.march.value / this.monthes.march.workDays).toFixed(2);
  this.monthes.april.dailyAvg = +(this.monthes.april.value / this.monthes.april.workDays).toFixed(2);
  this.monthes.may.dailyAvg = +(this.monthes.may.value / this.monthes.may.workDays).toFixed(2);
  this.monthes.june.dailyAvg = +(this.monthes.june.value / this.monthes.june.workDays).toFixed(2);
  this.monthes.july.dailyAvg = +(this.monthes.july.value / this.monthes.july.workDays).toFixed(2);
  this.monthes.august.dailyAvg = +(this.monthes.august.value / this.monthes.august.workDays).toFixed(2) || 0;
  this.monthes.september.dailyAvg = +(this.monthes.september.value / this.monthes.september.workDays).toFixed(2);
  this.monthes.october.dailyAvg = +(this.monthes.october.value / this.monthes.october.workDays).toFixed(2) ?? 0;
  this.monthes.november.dailyAvg = +(this.monthes.november.value / this.monthes.november.workDays).toFixed(2);
  next();
});

const Record = mongoose.model<IRecord>("Record", RecordSchema, "record");

export default Record;
