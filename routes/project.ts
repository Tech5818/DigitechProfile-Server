import express from "express";
import * as projectController from "../Controller/projectController";

const router = express.Router();

router.post("/create", projectController.createProject);
router.get("/read", projectController.readProject);
router.get("/readAll", projectController.readAllProject);
router.put("/update", projectController.updateProject);

export default router;
