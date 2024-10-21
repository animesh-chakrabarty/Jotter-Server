import {
  signUp,
  logIn,
  verifyOTP,
  resetPassword,
  forgotPassword,
  changeEmail,
} from "./auth.controllers.js";

import {
  createArticle,
  deleteArticle,
  editArticle,
  fetchArticleById,
  fetchArticleByUserId,
  fetchFeaturedArticle,
} from "./article.controllers.js";

export const authControllers = {
  signUp,
  logIn,
  verifyOTP,
  resetPassword,
  forgotPassword,
  changeEmail,
};

export const articleContorller = {
  createArticle,
  deleteArticle,
  editArticle,
  fetchArticleById,
  fetchArticleByUserId,
  fetchFeaturedArticle,
};
