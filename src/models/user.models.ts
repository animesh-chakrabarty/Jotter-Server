import mongoose, { Model } from "mongoose";
import { userSchema } from "../schemas/user.schemas.js";
import {
  userInterface,
  userModelInterface,
} from "../interfaces/user.interfaces.js";
import validator from "validator";
import { hashContent } from "../utils/hashContent.js";

userSchema.statics.registerUser = async function (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<userInterface | null> {
  // check if all fields are non-null
  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required");
  }
  // check if email is valid
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
  // check if password is strong
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
  // check if email already exists
  const doesEmailAlreadyExist = await this.findOne({ email });
  if (doesEmailAlreadyExist) {
    if (doesEmailAlreadyExist.isVerified) {
      throw new Error("Email already exists");
    } else if (!doesEmailAlreadyExist.isVerified) {
      try {
        await this.findOneAndDelete({ email });
      } catch (err: any) {
        throw new Error(err.message || err.toString());
      }
    }
  }
  // if all validations are passed
  try {
    // - hash password
    const hashedPassword = await hashContent(password);
    // - write user credentials to DB
    const newUser = await this.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return newUser;
  } catch (err: any) {
    throw new Error(err.message() || err.toString());
  }
};

export const userModel = mongoose.model<userInterface, userModelInterface>(
  "user",
  userSchema
);
