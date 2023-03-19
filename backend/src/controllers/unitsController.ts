import express from "express";
import Unit from "../model/UnitModel";
import Factory from "../model/FactoryModel";
import Token from "../model/TokenModel";
import User from "../model/UserModel";
import Record from "../model/RecordModel";
import mongoose from "mongoose";

export const getFactoryNameAndUnits = async (req: express.Request, res: express.Response) => {
  const cookies = req.cookies;
  if (!cookies?.token) return res.status(401).json({ error: "Error no cookies" });

  const refreshToken = cookies.token;
  const foundToken = await Token.findOne({ refreshToken: refreshToken }).exec();
  const foundUser = await User.findById(foundToken?.userId);
  if (!foundUser) return res.status(403).json({ error: "Error user not found" });
  const id = foundUser._id;

  const factory: any = await User.aggregate([
    {
      $match: {
        _id: id,
      },
    },
    {
      $lookup: {
        from: "factory",
        localField: "factoryId",
        foreignField: "_id",
        as: "factoryName",
      },
    },
  ]);

  if (!factory || factory.length === 0) return res.status(403).json({ error: "Factory is not found" });

  const factoryId = factory[0].factoryName[0]._id;
  const factoryName = factory[0].factoryName[0].name;

  const units = await Unit.aggregate([
    {
      $match: {
        factoryId: factoryId,
      },
    },
  ]);

  if (!units || units.length === 0)
    return res.status(403).json({ id: factoryId, factoryName: factoryName, error: "Units are not found" });

  return res.status(200).json({ id: factoryId, factoryName: factoryName, units: units });
};

export const addNewUnit = async (req: express.Request, res: express.Response) => {
  const { factoryId, name } = req.body;

  if (!factoryId || !name) return res.status(400).json({ message: `Properties are required` });

  if (await Unit.findOne({ factoryId: factoryId, name: name }).exec())
    return res.status(409).json({ message: `Such unit (${name}) exists` });

  await Unit.create({ factoryId: factoryId, name: name }, (err, data) => {
    if (err) res.status(400).json({ error: err });
  });

  return res.status(200).json({ message: "The Unit was created" });
};

export const getCalculationsByIndicator = async (req: express.Request, res: express.Response) => {
  const { indicatorId } = req.params;
  const { unitIds }: any = req.query;

  console.log(indicatorId, unitIds);
  if (!indicatorId || !unitIds) return res.status(400).json({ message: `Properties are required` });

  const records = await Record.find({
    indicatorId: indicatorId,
    unitId: {
      $in: unitIds.map(function (id: string) {
        return new mongoose.Types.ObjectId(id);
      }),
    },
  });

  console.log(records);
  const yearArr = Object.values(records).map(({ year }) => {
    return year;
  });

  const minYear = Math.min(...yearArr);
  const maxYear = Math.max(...yearArr);

  const calculations = [];

  for (let year = minYear; year <= maxYear; year++) {
    let localRecords = records.filter((record) => record.year === year);
    let divider = localRecords.length ?? 1;

    let monthes = {
      december: { value: 0, dailyAvg: 0 },
      january: { value: 0, dailyAvg: 0 },
      february: { value: 0, dailyAvg: 0 },
      march: { value: 0, dailyAvg: 0 },
      april: { value: 0, dailyAvg: 0 },
      may: { value: 0, dailyAvg: 0 },
      june: { value: 0, dailyAvg: 0 },
      july: { value: 0, dailyAvg: 0 },
      august: { value: 0, dailyAvg: 0 },
      september: { value: 0, dailyAvg: 0 },
      october: { value: 0, dailyAvg: 0 },
      november: { value: 0, dailyAvg: 0 },
    };

    monthes.december.value = Object.values(localRecords).reduce((prev: any, curr: any) => {
      return prev + curr.monthes.december?.value;
    }, 0);

    monthes.december.dailyAvg =
      Object.values(localRecords).reduce((prev: any, curr: any) => {
        return prev + curr.monthes.december?.dailyAvg;
      }, 0) / divider;

    monthes.january.value = Object.values(localRecords).reduce((prev: any, curr: any) => {
      return prev + curr.monthes.january?.value;
    }, 0);

    monthes.january.dailyAvg =
      Object.values(localRecords).reduce((prev: any, curr: any) => {
        return prev + curr.monthes.january?.dailyAvg;
      }, 0) / divider;

    monthes.february.value = Object.values(localRecords).reduce((prev: any, curr: any) => {
      return prev + curr.monthes.february?.value;
    }, 0);

    monthes.february.dailyAvg =
      Object.values(localRecords).reduce((prev: any, curr: any) => {
        return prev + curr.monthes.february?.dailyAvg;
      }, 0) / divider;

    monthes.march.value = Object.values(localRecords).reduce((prev: any, curr: any) => {
      return prev + curr.monthes.march?.value;
    }, 0);

    monthes.march.dailyAvg =
      Object.values(localRecords).reduce((prev: any, curr: any) => {
        return prev + curr.monthes.march?.dailyAvg;
      }, 0) / divider;

    monthes.april.value = Object.values(localRecords).reduce((prev: any, curr: any) => {
      return prev + curr.monthes.april?.value;
    }, 0);

    monthes.april.dailyAvg =
      Object.values(localRecords).reduce((prev: any, curr: any) => {
        return prev + curr.monthes.april?.dailyAvg;
      }, 0) / divider;

    monthes.may.value = Object.values(localRecords).reduce((prev: any, curr: any) => {
      return prev + curr.monthes.may?.value;
    }, 0);

    monthes.may.dailyAvg =
      Object.values(localRecords).reduce((prev: any, curr: any) => {
        return prev + curr.monthes.may?.dailyAvg;
      }, 0) / divider;

    monthes.june.value = Object.values(localRecords).reduce((prev: any, curr: any) => {
      return prev + curr.monthes.june?.value;
    }, 0);

    monthes.june.dailyAvg =
      Object.values(localRecords).reduce((prev: any, curr: any) => {
        return prev + curr.monthes.june?.dailyAvg;
      }, 0) / divider;

    monthes.july.value = Object.values(localRecords).reduce((prev: any, curr: any) => {
      return prev + curr.monthes.july?.value;
    }, 0);

    monthes.july.dailyAvg =
      Object.values(localRecords).reduce((prev: any, curr: any) => {
        return prev + curr.monthes.july?.dailyAvg;
      }, 0) / divider;

    monthes.august.value = Object.values(localRecords).reduce((prev: any, curr: any) => {
      return prev + curr.monthes.august?.value;
    }, 0);

    monthes.august.dailyAvg =
      Object.values(localRecords).reduce((prev: any, curr: any) => {
        return prev + curr.monthes.august?.dailyAvg;
      }, 0) / divider;

    monthes.september.value = Object.values(localRecords).reduce((prev: any, curr: any) => {
      return prev + curr.monthes.september?.value;
    }, 0);

    monthes.september.dailyAvg =
      Object.values(localRecords).reduce((prev: any, curr: any) => {
        return prev + curr.monthes.september?.dailyAvg;
      }, 0) / divider;

    monthes.october.value = Object.values(localRecords).reduce((prev: any, curr: any) => {
      return prev + curr.monthes.october?.value;
    }, 0);

    monthes.october.dailyAvg =
      Object.values(localRecords).reduce((prev: any, curr: any) => {
        return prev + curr.monthes.october?.dailyAvg;
      }, 0) / divider;

    monthes.november.value = Object.values(localRecords).reduce((prev: any, curr: any) => {
      return prev + curr.monthes.november?.value;
    }, 0);

    monthes.november.dailyAvg =
      Object.values(localRecords).reduce((prev: any, curr: any) => {
        return prev + curr.monthes.november?.dailyAvg;
      }, 0) / divider;

    calculations.push({ year: year, monthes: monthes });
  }

  if (!calculations || calculations.length == 0) return res.status(409).json({ error: "no data" });
  res.status(200).json({ calculations: calculations });
};
