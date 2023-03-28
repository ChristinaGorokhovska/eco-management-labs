import express from "express";
import Indicator from "../model/IndicatorModel";
import Record from "../model/RecordModel";
const mongoose = require("mongoose");

export const getRecordByUnit = async (req: express.Request, res: express.Response) => {
  const { unitId, indicatorId } = req.params;

  if (!unitId || !indicatorId) return res.status(400).json({ message: `Incorrect id` });

  const result: any = await Record.find({
    unitId: mongoose.Types.ObjectId(unitId),
    indicatorId: mongoose.Types.ObjectId(indicatorId),
  });

  if (!result || result.length === 0) return res.status(403).json({ error: "result are not found" });

  const records: any = [];

  result.forEach((element: any) => {
    records.push({ monthes: element.monthes, year: element.year });
  });

  const avg: any = [];

  records.forEach((element: any) => {
    let name, max, min;

    let annual: any = Object.values(element.monthes).reduce((prev: any, curr: any) => {
      return prev + curr.value;
    }, 0);

    let workingMonthes: number = Object.values(element.monthes).filter((element: any) => {
      return element.workDays > 0;
    }).length;

    let findMax = (
      Object.entries(element.monthes) as Array<[string, { value: number; workDays: number; dailyAvg?: number }]>
    ).reduce(([prevMonth, prevMonthValue]: [string, any], [currMonth, currMonthValue]: [string, any]) => {
      name = prevMonth;
      max = prevMonthValue;
      if (prevMonthValue.value < currMonthValue.value) {
        max = currMonthValue;
        name = currMonth;
      }
      return [name, max];
    });

    let findMin = (
      Object.entries(element.monthes) as Array<[string, { value: number; workDays: number; dailyAvg?: number }]>
    ).reduce(([prevMonth, prevMonthValue], [currMonth, currMonthValue]) => {
      name = prevMonth;
      min = prevMonthValue;
      if (prevMonthValue.value > currMonthValue.value && currMonthValue.value !== 0) {
        min = currMonthValue;
        name = currMonth;
      }
      return [name, min];
    });

    avg.push({
      year: element.year,
      annual: annual,
      avgAnnual: annual / workingMonthes,
      max: findMax[1].value === 0 ? null : findMax,
      min: findMin[1].value === 0 ? null : findMin,
      koef: findMax[1].value === 0 && findMin[1].value === 0 ? null : findMax[1].value / findMin[1].value,
    });
  });

  res.status(200).json({ records: records, avg: avg });
};

export const getCostsByUnitAndIndicator = async (req: express.Request, res: express.Response) => {
  const { unitId, indicatorId } = req.params;

  if (!unitId || !indicatorId) return res.status(400).json({ message: `Incorrect id` });

  try {
    const result: any = await Record.find({
      unitId: new mongoose.Types.ObjectId(unitId),
      indicatorId: new mongoose.Types.ObjectId(indicatorId),
    });

    const indicator = await Indicator.find({ _id: mongoose.Types.ObjectId(indicatorId) });

    if (!indicator) return res.status(403).json({ error: "Indicator is not found" });
    if (!result || result.length === 0) return res.status(403).json({ error: "result are not found" });

    const records: any = [];
    const price: any = indicator[0].price;

    result.forEach((res: any) => {
      const annual: any = Object.values(res.monthes).reduce((prev: any, curr: any) => {
        return prev + curr.value;
      }, 0);

      records.push({ year: res.year, annual: annual * price });
    });

    res.status(200).json({ costs: records });
  } catch (error) {
    console.log(error);
  }
};

export const getYearsByUnit = async (req: express.Request, res: express.Response) => {
  const { unitId } = req.params;
  if (!unitId) return res.status(400).json({ message: `Properties are required` });
};

export const getAnnualCostsByUnit = async (req: express.Request, res: express.Response) => {
  const { year, unitId } = req.params;
  if (!year || !unitId) return res.status(400).json({ message: `Properties are required` });

  const records = await Record.aggregate([
    {
      $match: {
        year: +year,
        unitId: new mongoose.Types.ObjectId(unitId),
      },
    },
    {
      $lookup: {
        from: "indicator",
        localField: "indicatorId",
        foreignField: "_id",
        as: "indicator",
      },
    },
  ]);

  if (!records || !records.length) return res.status(403).json({ error: "result are not found" });

  const annualCosts: any = [];

  records.forEach((record) => {
    const annual: any = Object.values(record.monthes).reduce((prev: any, curr: any) => {
      return prev + curr.value;
    }, 0);
    annualCosts.push({ name: record.indicator[0]?.name, annual: annual * record.indicator[0]?.price });
  });

  res.status(200).json({ costs: annualCosts });
};

export const generateData = async (req: express.Request, res: express.Response) => {
  const { unitId, indicatorId, year, monthes } = req.body;
  if (!unitId || !indicatorId || !year || !monthes) return res.status(400).json({ message: `Properties are required` });

  if (await Record.findOne({ year: year, unitId: unitId, indicatorId: indicatorId }).exec())
    return res.status(409).json({ message: `Data for year(${year}) exists` });

  await Record.create({ unitId: unitId, indicatorId: indicatorId, year: year, monthes: monthes }, (err, data) => {
    if (err) return res.status(400).json({ error: err });
  });

  return res.status(200).json({ message: "The row was inserted" });
};
