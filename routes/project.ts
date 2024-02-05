import express from "express";
import * as projectController from "../Controller/projectController";

const router = express.Router();

router.post("/create", projectController.createProject);

export default router;
