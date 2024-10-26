import { Document, Model } from "mongoose";

export interface articleInterface extends Document {
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface articleModelInterface extends Model<articleInterface> {}
