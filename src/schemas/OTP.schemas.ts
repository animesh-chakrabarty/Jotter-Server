import mongoose, { Model } from "mongoose";
import { OTPInterface } from "../interfaces/OTP.interfaces";

export const OTPSchema = new mongoose.Schema<OTPInterface>({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  OTP: {
    type: Number,
    required: true,
  },
  expirationTimeStamp: {
    type: Date,
    required: true,
  },
});
