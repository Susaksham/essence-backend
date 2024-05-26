import express from "express";
import User from "../model/UserModel.js";
import { updateUserTime, getUserStats } from "../controller/userController.js";
const userRouter = express.Router();

userRouter.put("/:id", updateUserTime);
userRouter.get("/:id", getUserStats);

export default userRouter;
