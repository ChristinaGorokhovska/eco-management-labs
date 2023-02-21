import express from "express";
import createUser from "../controllers/registerController";
import loginUser from "../controllers/loginController";
import refreshToken from "../controllers/refreshTokenController";
import getAllUsers from "../controllers/userController";
import verifyToken from "../middleware/verifyToken";
import verifyRoles from "../middleware/verifyRoles";
import ROLES from "../config/roles";
import logoutUser from "../controllers/logoutController";
import { addNewUnit, getFactoryNameAndUnits } from "../controllers/unitsController";
import { getIndicators } from "../controllers/indicatorsController";
import { generateData, getRecordByUnit } from "../controllers/recordController";

const routes = require("express").Router();

routes.get("/", (req: express.Request, res: express.Response) => {
  res.send("Test endpoint");
});

routes.post("/register", createUser);
routes.post("/login", loginUser);
routes.get("/refresh", refreshToken);
routes.get("/logout", logoutUser);

routes.get("/units", getFactoryNameAndUnits);

routes.get("/units/:id", getIndicators);
routes.get("/units/:unitId/records/:indicatorId", getRecordByUnit);

routes.post("/records", generateData);

routes.post("/factories/:id/units", addNewUnit);

routes.get("/users", verifyRoles(ROLES.Owner), verifyToken, getAllUsers);
module.exports = routes;
