import express from "express";
import Indicator from "../model/IndicatorModel";
import Record from "../model/RecordModel";
const mongoose = require("mongoose");

export const getAllIndicators = async (req: express.Request, res: express.Response) => {
  const indicators = await Indicator.find({});

  if (!indicators || indicators.length === 0) return res.status(403).json({ error: "Indicators are not found" });

  return res.status(200).json({ indicators: indicators });
};
export const getIndicators = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: `Incorrect id` });

  const result: any = await Indicator.aggregate([
    {
      $lookup: {
        from: "record",
        localField: "_id",
        foreignField: "indicatorId",
        as: "indicatorName",
      },
    },
  ]);
  console.log(result);

  if (!result || result.length === 0) return res.status(403).json({ error: "Indicators are not found" });

  const indicators: any = [];

  result.forEach((element: any) => {
    indicators.push({ _id: element._id, name: element.name });
  });

  return res.status(200).json({ indicators: indicators });
};

export const getIndicator = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: `Incorrect id` });

  const indicator = await Indicator.find({ _id: id });
  if (!indicator) return res.status(403).json({ error: "Indicator is not found" });

  res.status(200).json({ indicator: indicator });
};
