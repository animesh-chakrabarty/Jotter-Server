import { userModel } from "../models/user.models";
import verifyHash from "./verifyHash";

export const verifyPassword = async (
  _id: string,
  password: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // fetch userDoc using id
    const userDoc = await userModel.findById(_id);
    if (!userDoc) throw new Error("User is invalid");

    // verify password
    const doesPassMatch = await verifyHash(password, userDoc?.password);
    if (!doesPassMatch) throw new Error("Password is incorrect");

    return { success: true, message: "Password matched" };
  } catch (err: any) {
    return { success: false, message: err.message || err.toString() };
  }
};

export default verifyPassword;
