import express from "express";
import * as interestedController from "../Controller/interestedController";

const router = express.Router();

router.post("/createProfile", interestedController.createInterestedProfile);
router.post("/createProject", interestedController.createInterestedProject);
router.get("/read", interestedController.readInterested);
router.delete("/deleteProfile", interestedController.deleteInterestedProfile);
router.delete("/deleteProject", interestedController.deleteInterestedProject);

export default router;
