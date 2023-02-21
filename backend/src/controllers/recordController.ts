import express from "express";
import Record from "../model/RecordModel";
const mongoose = require("mongoose");

export const getRecordByUnit = async (req: express.Request, res: express.Response) => {
  const { unitId, indicatorId } = req.params;
  console.log(unitId);

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

  res.status(200).json({ records: records });
};

export const generateData = async (req: express.Request, res: express.Response) => {
  const { unitId, indicatorId, year, monthes } = req.body;
  if (!unitId || !indicatorId || !year || !monthes) return res.status(400).json({ message: `Properties are required` });

  if (await Record.findOne({ year: year, unitId: unitId, indicatorId: indicatorId }).exec())
    return res.status(409).json({ message: `Data for year(${year}) exists` });

  await Record.create({ unitId: unitId, indicatorId: indicatorId, year: year, monthes: monthes }, (err, data) => {
    if (err) res.status(400).json({ error: err });
  });

  return res.status(200).json({ message: "The row was inserted" });
};
