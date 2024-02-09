import { Document } from "mongoose";
import { IUser } from "./user";

export interface IProject extends Document {
  title: string;
  desired: string[];
  content: string;
  postDate?: Date;
  author: IUser["_id"];
  like?: number;
  thumbnail?: string;
}
