import express from "express";
import Record from "../model/RecordModel";
const mongoose = require("mongoose");

export const getRecordByUnit = async (req: express.Request, res: express.Response) => {
  const { unitId, indicatorId } = req.params;

  if (!unitId) return res.status(400).json({ message: `Incorrect id` });

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
      avgAnnual: annual / 12,
      max: findMax,
      min: findMin,
      koef: findMax[1].value / findMin[1].value,
    });
  });

  res.status(200).json({ records: records, avg: avg });
};

export const getAvgByUnit = async (req: express.Request, res: express.Response) => {
  const { unitId, indicatorId } = req.params;
  if (!unitId) return res.status(400).json({ message: `Incorrect id` });
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
