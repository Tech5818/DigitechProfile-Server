import { Connection } from "mongoose";
import {
  interested_connection,
  project_connection,
  user_connection,
} from "./connection";

export const mongo_user = (): Connection => {
  try {
    const connection = user_connection;
    console.log("Mongo DB User Database 연결 성공");
    return connection;
  } catch (error) {
    console.error("Mongo DB User Database 연결 실패");
    throw error;
  }
};

export const mongo_interested = async (): Promise<Connection> => {
  try {
    const connection = interested_connection;
    console.log("Mongo DB Interested Database 연결 성공");

    return connection;
  } catch (error) {
    console.error("Mongo DB Interested Database 연결 실패");
    throw error;
  }
};

export const mongo_project = async (): Promise<Connection> => {
  try {
    const connection = project_connection;
    console.log("Mongo DB Project Database 연결 성공");

    return connection;
  } catch (error) {
    console.error("Mongo DB Project Database 연결 실패");
    throw error;
  }
};
