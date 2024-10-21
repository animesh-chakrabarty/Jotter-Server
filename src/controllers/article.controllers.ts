import express, { Request, Response } from "express";

const createArticle = (req: Request, res: Response): void => {
  res.json({ message: "Now you can create article" });
};

const deleteArticle = async () => {};

const editArticle = async () => {};

const fetchArticleById = async () => {};

const fetchFeaturedArticle = async () => {};

export const controllers = {
  createArticle,
  deleteArticle,
  editArticle,
  fetchArticleById,
  fetchFeaturedArticle,
};
