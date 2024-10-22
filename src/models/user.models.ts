import mongoose, { Model } from "mongoose";

interface userInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
}

const userSchema = new mongoose.Schema<userInterface>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
});

export const userModel: Model<userInterface> = mongoose.model(
  "user",
  userSchema
);
