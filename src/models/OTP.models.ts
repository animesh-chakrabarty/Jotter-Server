import mongoose, { Model } from "mongoose";

interface OTPInterface {
  userId: string;
  OTP: number;
  expirationTimeStamp: Date;
}

const OTPSchema = new mongoose.Schema<OTPInterface>({
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

export const OTPModel: Model<OTPInterface> = mongoose.model("OTP", OTPSchema);
