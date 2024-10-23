import { Document, Model } from "mongoose";

export interface userInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified?: boolean;
}

export interface userModelInterface extends Model<userInterface> {
  registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<userInterface | null>;
}
