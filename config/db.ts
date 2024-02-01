import mongoose, { Connection } from "mongoose";

const mongoURL = process.env.MONGO_URL;
export const mongoDB = async (): Promise<Connection> => {
  try {
    const connection = await mongoose.connect(mongoURL!);
    console.log("Mongo DB 연결 성공");

    return connection.connection;
  } catch (error) {
    console.error("Mongo DB 연결 실패");
    throw error;
  }
};
mongoDB();
