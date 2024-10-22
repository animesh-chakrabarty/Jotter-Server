import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateJWT = (payload: string) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET as string);
  return token;
};

export default generateJWT;
