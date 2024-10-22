import { Document } from "mongoose";

export interface OTPInterface extends Document{
  userId: string;
  OTP: string;
  expirationTimeStamp: Date;
}

