import express, { Request, Response } from "express";
import { controllers as articleController } from "../controllers/article.controllers.js";
import verifyToken from "../middlewares/verifyToken.middlewares.js";

const articleRouter = express.Router();

articleRouter.post("/save-to-draft", verifyToken, articleController.createArticle);
articleRouter.post("/publish", verifyToken, articleController.createArticle);
articleRouter.post("/delete", verifyToken, articleController.deleteArticle);
articleRouter.post("/edit", verifyToken, articleController.editArticle);
articleRouter.post("/:Id", articleController.fetchArticleById);
articleRouter.post("/featured", articleController.fetchFeaturedArticle);

export default articleRouter;
