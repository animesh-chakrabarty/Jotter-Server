import { Document } from "mongoose";

export interface userInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified?: boolean;
}

export interface userModelInterface extends userInterface {
  registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<userInterface | null>;
}
