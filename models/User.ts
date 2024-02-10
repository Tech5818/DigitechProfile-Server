import { user_connection } from "../config/connection";
import { Schema } from "mongoose";
import { IUser } from "./interface/user";

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  major: { type: String, required: true },
  grade: { type: Number, required: true },
  joinDate: { type: Date, default: Date.now },
  skills: [{ type: String, required: true }],
  language: [{ type: String, required: true }],
  interesteds: {
    type: Schema.Types.ObjectId,
    ref: "Interested",
  },
  postProject: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  like: { type: Number, default: 0 },
  img: { type: String, required: true },
});

export const User = user_connection.model<IUser>("User", userSchema);
