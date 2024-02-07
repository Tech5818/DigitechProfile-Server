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
import userRouter from "./routes/user.ts";
import authRouter from "./routes/auth.ts";
import interestedRouter from "./routes/interested.ts";
import projectRouter from "./routes/project.ts";

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
app.use("/user", userRouter);
app.use("/interested", interestedRouter);
app.use("/project", projectRouter);

import * as mongoDB from "./config/db.ts";

mongoDB.mongo_user();
mongoDB.mongo_interested();
mongoDB.mongo_project();

import passport from "./auth/passportConfig.ts";
app.use(passport.initialize());

app.use("/auth", authRouter);
export default app;
