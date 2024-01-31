// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";

import indexRouter from "./routes/index.ts";
import usersRouter from "./routes/users.ts";

const app = express();

dotenv.config();

// view engine setup
app.set("views", path.join(__dirname, "views"));
// app.set('view engine', 'jade');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// error handler
// app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
//   // set locals, only providing error in development
//   res.locals.message = err!.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err!.status || 500);
//   res.render("error");
// });
import mongoose from "mongoose";

const mongo_url = process.env.MONGO_URL;
export const mongoDB = mongoose
  .connect(mongo_url!)
  .then(() => console.log("mongoDB is connect"))
  .catch(() => console.log("mongoDB is not connected"));

export default app;
