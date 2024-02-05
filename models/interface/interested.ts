import { Document } from "mongoose";
import { IUser } from "./user";
import { IProject } from "./project";

export interface IInterested extends Document {
  owner: IUser["_id"];
  profiles?: IUser["_id"][];
  projects?: IProject["_id"][];
}
