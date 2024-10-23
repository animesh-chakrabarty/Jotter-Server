import { Request, Response } from "express";
import { userModel } from "../models/user.models.js";
import { userInterface } from "../interfaces/user.interfaces.js";
import generateOTP from "../utils/generateOTP.js";
import sendMail from "../utils/sendMail.js";
import generateJWT from "../utils/generateJWT.js";
import { OTPModel } from "../models/OTP.models.js";

export const signUp = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // register user in DB
    const user: userInterface | null = await userModel.registerUser(
      firstName,
      lastName,
      email,
      password
    );

    if (!user) {
      throw new Error("Error while writing user credentials to DB");
    }

    // generate OTP
    const OTP = generateOTP();

    // send OTP
    const mailInfo = await sendMail(email, OTP);

    // write OTP in DB
    const OTPData = new OTPModel({
      userId: user._id as string,
      OTP: OTP,
      expirationTimeStamp: new Date(Date.now() + 3600000),
    });
    await OTPData.save();

    // generate JWT
    const token = generateJWT(user._id as string);

    res
      .status(200)
      .json({ success: true, message: { email: user.email }, token: token });
  } catch (err: any) {
    res
      .status(400)
      .json({ success: false, message: err.message || err.toString() });
  }
};

export const logIn = async () => {};

export const verifyOTP = async (req: Request, res: Response) => {
  const { OTP, _id } = req.body;

  try {
    // retrieve OTP from DB
    const doc = await OTPModel.findOne({ userId: _id });
    if (!doc) throw new Error("No OTP in DB for this user");

    // if OTP doesn't match - return 400 res
    if (doc.OTP != OTP) {
      throw new Error("OTP doesn't match");
    }

    // if timeLimit is over - return 400 res
    if (doc.expirationTimeStamp < new Date(Date.now())) {
      throw new Error("OTP has expired");
    }

    // if OTP matches & within time limit - return 200 res
    if (doc.OTP == OTP && doc.expirationTimeStamp >= new Date(Date.now())) {
      // update isVerified to true
      const userDoc = await userModel.findByIdAndUpdate(_id, {
        isVerified: true,
      });

      // delete OTP doc
      const deleteOTPDoc = await OTPModel.findOneAndDelete({ userId: _id });
      res.status(200).json({ success: true, message: "user is verified" });
    }
  } catch (err: any) {
    res
      .status(400)
      .json({ success: false, message: err.message || err.toString() });
  }
};

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
