import express from "express";
import * as UserController from "../Controller/userController";

const router = express.Router();

router.post("/create", UserController.createUser);
router.get("/read", UserController.readUser);
router.get("/readAll", UserController.readAllUser);
router.put("/update", UserController.updateUser);
router.delete("/deleteUser", UserController.deleteUser);

export default router;
