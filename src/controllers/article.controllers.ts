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

const deleteArticle = async (req: Request, res: Response) => {
  const { _id, articleId } = req.body;

  try {
    const articleDoc = await articleModel.findById(articleId);
    if (!articleDoc) throw new Error("Article doesn't exist");

    if (articleDoc.authorId != _id)
      throw new Error(
        "You're not the author of the article you're trying to delete"
      );

    await articleModel.findByIdAndDelete(articleDoc._id);

    res
      .status(200)
      .json({ success: true, message: "article deleted successfully" });
  } catch (err: any) {
    res
      .status(400)
      .json({ success: false, message: err.message || err.toString() });
  }
};

const editArticle = async (req: Request, res: Response) => {
  const { _id, articleId } = req.body;

  try {
    const articleDoc = await articleModel.findById(articleId);
    if (!articleDoc) throw new Error("Article doesn't exist");

    if (articleDoc.authorId != _id)
      throw new Error(
        "You're not the author of the article you're trying to edit"
      );

    res.status(200).json({
      success: true,
      message: "article attached",
      article: {
        title: articleDoc.title,
        content: articleDoc.content,
      },
    });
  } catch (err: any) {
    res
      .status(400)
      .json({ success: false, message: err.message || err.toString() });
  }
};

const fetchArticleById = async (req: Request, res: Response) => {
  const { articleId } = req.params;

  try {
    const articleDoc = await articleModel.findById(articleId);
    if (!articleDoc) throw new Error("Article doesn't exist");

    res.status(200).json({
      success: true,
      message: "article attached",
      article: articleDoc,
    });
  } catch (err: any) {
    res
      .status(400)
      .json({ success: false, message: err.message || err.toString() });
  }
};

const fetchFeaturedArticle = async () => {};

export const controllers = {
  publishArticle,
  deleteArticle,
  editArticle,
  fetchArticleById,
  fetchFeaturedArticle,
};
