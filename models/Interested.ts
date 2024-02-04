import mongoose, { Schema } from "mongoose";
import { IInterested } from "./interface/interested";

const interestedSchema: Schema<IInterested> = new Schema({
  profiles: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  projects: [{ type: Schema.Types.ObjectId, ref: "Project", required: true }],
});

export const Interested = mongoose.model<IInterested>(
  "Interested",
  interestedSchema
);
