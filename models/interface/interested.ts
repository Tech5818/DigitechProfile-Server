import { Document } from "mongoose";
import { IUser } from "./user";
import { IProject } from "./project";

export interface IInterested extends Document {
  profiles: IUser["_id"][];
  projects: IProject["_id"][];
}
