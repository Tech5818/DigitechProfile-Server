import mongoose, { Schema } from "mongoose";
import { IUser } from "./interface/user";

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  major: { type: String, required: true },
  grade: { type: Number, required: true },
  joinDate: { type: Date, default: Date.now },
  skills: [{ type: String, required: true }],
  language: [{ type: String, required: true }],
  interested: {
    type: Schema.Types.ObjectId,
    ref: "Interested",
    required: true,
  },
  postProject: [
    { type: Schema.Types.ObjectId, ref: "Project", required: true },
  ],
  like: { type: Number, required: true },
});

export const User = mongoose.model<IUser>("User", userSchema);
