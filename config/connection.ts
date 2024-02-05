import mongoose, { Connection } from "mongoose";
import { config } from "dotenv";
config();

const UserDatabase = process.env.MONGO_URL_USER;
const InterestedDatabase = process.env.MONGO_URL_INTERESTED;
const ProjectDatabase = process.env.MONGO_URL_PROJECT;

export const user_connection: Connection = mongoose.createConnection(
  UserDatabase!
);
export const interested_connection: Connection = mongoose.createConnection(
  InterestedDatabase!
);
export const project_connection: Connection = mongoose.createConnection(
  ProjectDatabase!
);
