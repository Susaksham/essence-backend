import express from "express";
import getUser from "../middleware/getUser.js";
import { registerUser, loginUser } from "../controller/authController.js";
const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", getUser, loginUser);

export default authRouter;
