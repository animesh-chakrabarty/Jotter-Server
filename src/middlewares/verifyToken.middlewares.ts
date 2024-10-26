import { NextFunction, Request, Response } from "express";
import verifyJWT from "../utils/verifyJWT.js";
import { userModel } from "../models/user.models.js";
import { userInterface } from "../interfaces/user.interfaces.js";

const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization } = req.headers;
  const token: string | undefined = authorization?.split(" ")[1];

  try {
    if (!token) throw new Error("token is undefined");

    const userId = verifyJWT(token);

    const doc: userInterface | null = await userModel.findById(userId);

    if (!doc) throw new Error("user not found");

    if (req.originalUrl != "/api/auth/verify-otp" && !doc.isVerified)
      throw new Error("Please verify the OTP first");

    req.body._id = userId;

    next();
  } catch (err: any) {
    res
      .status(400)
      .json({ success: false, message: err.message || err.toString() });
  }
};

export default verifyToken;
