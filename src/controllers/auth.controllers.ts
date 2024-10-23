import { Request, Response } from "express";
import { userModel } from "../models/user.models.js";
import { userInterface } from "../interfaces/user.interfaces.js";
import generateOTP from "../utils/generateOTP.js";
import sendMail from "../utils/sendMail.js";
import generateJWT from "../utils/generateJWT.js";
import { OTPModel } from "../models/OTP.models.js";
import validator from "validator";
import verifyHash from "../utils/verifyHash.js";
import { hashContent } from "../utils/hashContent.js";
import verifyPassword from "../utils/verifyPassword.js";

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
      .json({ success: true, message: `OTP sent to ${email}`, token });
  } catch (err: any) {
    res
      .status(400)
      .json({ success: false, message: err.message || err.toString() });
  }
};

export const logIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // check is email is valid
    if (!validator.isEmail(email)) throw new Error("Email is not valid");

    // check if email exists in users collection
    const userDoc: userInterface | null = await userModel.findOne({ email });
    if (!userDoc) throw new Error("User doesn't exist");

    // check if password matches
    const doesPassMatch = await verifyHash(password, userDoc.password);
    if (!doesPassMatch) throw new Error("Password is incorrect");

    // generate JWT
    const token = generateJWT(userDoc._id as string);

    res.status(200).json({ success: true, message: { token } });
  } catch (err: any) {
    res
      .status(400)
      .json({ success: false, message: err.message || err.toString() });
  }
};

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

      res
        .status(200)
        .json({ success: true, message: "OTP verification successful" });
    }
  } catch (err: any) {
    res
      .status(400)
      .json({ success: false, message: err.message || err.toString() });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { _id, oldPassword } = req.body;

  try {
    const userDoc: userInterface | null = await userModel.findById(_id);
    if (!userDoc) throw new Error("user doesn't exist");

    // check if oldPassword matches with the stored password in the DB
    const doesPassMatch = await verifyHash(
      oldPassword as string,
      userDoc?.password as string
    );
    if (!doesPassMatch) throw new Error("password is incorrect");

    await setNewPassword(req, res);
  } catch (err: any) {
    res
      .status(400)
      .json({ success: false, message: err.message || err.toString() });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // check if email is valid
    if (!validator.isEmail(email)) throw new Error("Email is not valid");

    // check if email exists in DB
    const userDoc: userInterface | null = await userModel.findOne({
      email,
    });
    if (!userDoc) throw new Error("User doesn't exist");

    // generate OTP
    const OTP = generateOTP();

    // write OTP to DB
    await OTPModel.create({
      userId: userDoc._id as string,
      OTP,
      expirationTimeStamp: new Date(Date.now() + 3600000),
    });

    // generate JWT
    const token = generateJWT(userDoc._id as string);

    // send OTP
    const ack = await sendMail(email, OTP);

    res
      .status(200)
      .json({ success: false, message: `OTP sent to ${email}`, token });
  } catch (err: any) {
    res
      .status(400)
      .json({ success: false, message: err.message || err.toString() });
  }
};

export const setNewPassword = async (req: Request, res: Response) => {
  const { newPassword, _id } = req.body;

  try {
    // check if password not null
    if (!newPassword) throw new Error("password is required");

    // check if password strong
    if (!validator.isStrongPassword(newPassword))
      throw new Error("password is not strong");

    // hash new password
    const hashedNewPass: string = await hashContent(newPassword as string);

    // update password in DB
    await userModel.findByIdAndUpdate(_id, { password: hashedNewPass });

    res
      .status(200)
      .json({ success: true, message: "password updated successfully" });
  } catch (err: any) {
    res
      .status(400)
      .json({ success: false, message: err.message || err.toString() });
  }
};

// export const changeEmail = async (req: Request, res: Response) => {
//   const { newEmail, _id } = req.body;

//   try {
//     // generate OTP
//     const OTP = generateOTP();

//     // save OTP to DB
//     const OTPDoc = new OTPModel({
//       userId: _id,
//       OTP,
//       expirationTimeStamp: new Date(Date.now() + 3600000),
//     });
//     await OTPDoc.save();

//     // send OTP
//     const ack = await sendMail(newEmail, OTP);

//     res.status(200).json({ success: true, message: `OTP sent to ${newEmail}` });
//   } catch (err: any) {
//     res
//       .status(400)
//       .json({ success: false, message: err.message || err.toString() });
//   }
// };

// export const verifyPass = async (req: Request, res: Response) => {
//   const { password, _id } = req.body;

//   try {
//     const { success, message } = await verifyPassword(_id, password);
//     if (!success) throw new Error(message);

//     res.status(200).json({ success: true, message });
//   } catch (err: any) {
//     res
//       .status(400)
//       .json({ success: false, message: err.message || err.toString() });
//   }
// };

export const controllers = {
  signUp,
  logIn,
  verifyOTP,
  resetPassword,
  forgotPassword,
  setNewPassword,
  // verifyPass,
  // changeEmail,
};
