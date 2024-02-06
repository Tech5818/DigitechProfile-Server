import express from "express";
import * as projectController from "../Controller/projectController";

const router = express.Router();

router.post("/create", projectController.createProject);
router.get("/read", projectController.readProject);
router.get("/readAll", projectController.readAllProject);

export default router;
