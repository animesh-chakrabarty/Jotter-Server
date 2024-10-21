import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/connectDB.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening to PORT: ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error("Database connection failed - ", err.message || err);
    process.exit(1);
  });
