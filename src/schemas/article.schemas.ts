import mongoose from "mongoose";
import { articleInterface } from "../interfaces/article.interfaces.js";

const articleSchema = new mongoose.Schema<articleInterface>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

export default articleSchema;
