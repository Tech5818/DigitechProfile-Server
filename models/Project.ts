import { Schema } from "mongoose";
import { IProject } from "./interface/project";
import { project_connection } from "../config/connection";

const projectSchema: Schema<IProject> = new Schema({
  title: { type: String, required: true },
  desired: [{ type: String, required: true }],
  content: { type: String, required: true },
  postDate: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, required: true },
  like: { type: Number, default: 0 },
});

export const Project = project_connection.model<IProject>(
  "Project",
  projectSchema,
  "projects"
);
