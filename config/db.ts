import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DatabaseName: string = process.env.DatabaseName!;
const DatabaseOwner: string = process.env.DatabaseOwner!;
const DatabasePassword: string = process.env.DatabasePassword!;

console.log(DatabaseName, DatabaseOwner, DatabasePassword);

const db = new Sequelize({
  username: DatabaseOwner,
  password: DatabasePassword,
  database: DatabaseName,
  host: "localhost",
  dialect: "postgres",
  port: 5432,
});

db.authenticate()
  .then(() => console.log("Database is connect"))
  .catch((error) => console.log("Fail Database connect message: ", error));

export default db;
