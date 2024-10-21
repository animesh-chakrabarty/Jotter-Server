import express from "express";
import { controllers as authControllers } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/sign-up", authControllers.signUp);
authRouter.post("/log-in", authControllers.logIn);
authRouter.post("/verify-OTP", authControllers.verifyOTP);
authRouter.post("/reset-password", authControllers.resetPassword);
authRouter.post("/forgot-password", authControllers.forgotPassword);
authRouter.post("/change-email", authControllers.changeEmail);

export default authRouter;
