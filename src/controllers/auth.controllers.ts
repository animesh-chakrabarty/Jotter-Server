import { Request, Response } from "express";
import { userModel } from "../models/user.models.js";
import { userInterface } from "../interfaces/user.interfaces.js";

export const signUp = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user: userInterface | null = await userModel.registerUser(
      firstName,
      lastName,
      email,
      password
    );
    res.status(200).json({ success: true, message: user });
  } catch (err: any) {
    res
      .status(400)
      .json({ success: false, message: err.message || err.toString() });
  }
};

export const logIn = async () => {};

export const verifyOTP = async () => {};

export const resetPassword = async () => {};

export const forgotPassword = async () => {};

export const changeEmail = async () => {};

export const controllers = {
  signUp,
  logIn,
  verifyOTP,
  resetPassword,
  forgotPassword,
  changeEmail,
};
