import express, { Request, Response } from "express";
import { articleModel } from "../models/article.models.js";

const publishArticle = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const { title, content } = req.body;

  try {
    const newArticle = new articleModel({
      authorId: _id,
      title,
      content,
      createdAt: Date.now(),
    });
    if (!newArticle) throw new Error("Error while creating new article");

    const articleDoc = await newArticle.save();
    if (!articleDoc) throw new Error("Error while saving article");

    res
      .status(200)
      .json({ success: true, message: "Article published successfully" });
  } catch (err: any) {
    res
      .status(400)
      .json({ success: false, message: err.message || err.toString() });
  }
};

const deleteArticle = async () => {};

const editArticle = async () => {};

const fetchArticleById = async () => {};

const fetchFeaturedArticle = async () => {};

export const controllers = {
  publishArticle,
  deleteArticle,
  editArticle,
  fetchArticleById,
  fetchFeaturedArticle,
};
