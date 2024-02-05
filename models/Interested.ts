import { Schema } from "mongoose";
import { IInterested } from "./interface/interested";
import { interested_connection } from "../config/connection";

const interestedSchema: Schema<IInterested> = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  profiles: [{ type: Schema.Types.ObjectId, ref: "User" }],
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
});

export const Interested = interested_connection.model<IInterested>(
  "Interested",
  interestedSchema,
  "interested"
);
