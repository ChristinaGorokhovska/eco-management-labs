export {};
import mongoose, { Schema } from "mongoose";

interface IUser {
  _id: Schema.Types.ObjectId;
  name: {
    firstName: string;
    lastName: string;
  };
  birthDate?: Date;
  email: string;
  password: string;
  roles: Object;
  factoryId: Schema.Types.ObjectId;
}

export const UserSchema = new Schema<IUser>({
  _id: Schema.Types.ObjectId,
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  birthDate: Date,
  roles: {
    Owner: {
      type: Number,
      default: 2001,
    },
    Employee: Number,
    Admin: Number,
  },
  factoryId: { type: Schema.Types.ObjectId, ref: "Factory" },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
