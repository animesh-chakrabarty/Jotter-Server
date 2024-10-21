import express, { Request, Response } from "express";
import { controllers as articleController } from "../controllers/article.controllers.js";

const articleRouter = express.Router();

articleRouter.post("/create", articleController.createArticle);
articleRouter.post("/delete", articleController.deleteArticle);
articleRouter.post("/edit", articleController.editArticle);
articleRouter.post("/:Id", articleController.fetchArticleById);
articleRouter.post("/featured", articleController.fetchFeaturedArticle);

export default articleRouter;
