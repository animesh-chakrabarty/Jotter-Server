import mongoose from "mongoose";
import articleSchema from "../schemas/article.schemas.js";
import {
  articleInterface,
  articleModelInterface,
} from "../interfaces/article.interfaces";

export const articleModel = mongoose.model<
  articleInterface,
  articleModelInterface
>("article", articleSchema);
