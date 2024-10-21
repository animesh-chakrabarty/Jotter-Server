import express from "express";
import { articleContorller } from "../controllers/index.js";

const articleRouter = express.Router();

articleRouter.post("/create", articleContorller.createArticle);
articleRouter.post("/delete", articleContorller.deleteArticle);
articleRouter.post("/edit", articleContorller.editArticle);
articleRouter.post("/:Id", articleContorller.fetchArticleById);
articleRouter.post("/:userId", articleContorller.fetchArticleByUserId);
articleRouter.post("/featured", articleContorller.fetchFeaturedArticle);

export default articleRouter;
