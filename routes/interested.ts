import express from "express";
import * as interestedController from "../Controller/interestedController";

const router = express.Router();

router.post("/createProfile", interestedController.createInterestedProfile);
router.get("/read", interestedController.readInterested);
router.delete("/deleteProfile", interestedController.deleteInterestedProfile);

export default router;
