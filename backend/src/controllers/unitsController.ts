import express from "express";
import Unit from "../model/UnitModel";
import Factory from "../model/FactoryModel";
import Token from "../model/TokenModel";
import User from "../model/UserModel";
import Record from "../model/RecordModel";

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
    return res.status(200).json({ id: factoryId, factoryName: factoryName, error: "Units are not found" });

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
