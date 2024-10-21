import express from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;

const createApp = () => {
  const app = express();

  app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`);
  });
};

export default createApp;
