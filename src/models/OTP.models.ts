import mongoose, { Model } from "mongoose";
import { OTPSchema } from "../schemas/OTP.schemas.js";
import { OTPInterface } from "../interfaces/OTP.interfaces.js";

export const OTPModel: Model<OTPInterface> = mongoose.model("OTP", OTPSchema);
