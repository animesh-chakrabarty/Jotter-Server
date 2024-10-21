import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Ensure MONGO_URI is defined, or throw an error
const MONGO_URI: string = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

const connectDB = async (): Promise<void> => {
  try {
    const connectionInstance = await mongoose.connect(MONGO_URI);
    console.log(connectionInstance.connections[0].host);
  } catch (err: any) {
    throw new Error(err.toString());
  }
};

export default connectDB;
