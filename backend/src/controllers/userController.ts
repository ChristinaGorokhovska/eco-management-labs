import express from "express";
import User from "../model/UserModel";

const getAllUsers = (req: express.Request, res: express.Response) => {
  User.find({}, function (err: Error, data: any) {
    if (data.length === 0 || err) return res.status(400).json({ message: "There are not any user" });

    return res.status(200).json(data);
  });
};

export default getAllUsers;

// db.users.updateOne(
//   { email: "maryna@gmail.com" },
//   {
//     $set: {
//       roles: {
//         Employee: 2002,
//       },
//       factoryId: ObjectId("63f4cd96d28a3df3f82b3b20"),
//     },
//   }
// );
