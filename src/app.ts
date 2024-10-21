import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";

dotenv.config();
const PORT = process.env.PORT;

const createApp = () => {
  const app = express();

  app.use("/api/auth", router.authRouter);
  app.use("/api/article", router.articleRouter);

  app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`);
  });
};

export default createApp;
