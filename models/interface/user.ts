import { Document } from "mongoose";
import { IInterested } from "./interested";
import { IProject } from "./project";

export interface IUser extends Document {
  name: string;
  email: string;
  major: string;
  grade: number;
  joinDate?: Date;
  skills: string[];
  language: string[];
  interesteds?: IInterested["_id"];
  postProject?: IProject["_id"][];
  like?: number;
}
