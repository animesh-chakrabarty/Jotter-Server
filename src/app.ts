import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import articleRouter from "./routes/article.routes.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT;

const createApp = () => {
  const app = express();

  app.use(cors({ origin: "http://localhost:5173/" }));
  app.use(express.json());

  app.use("/api/auth", authRouter);
  app.use("/api/article", articleRouter);

  app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`);
  });
};

export default createApp;
