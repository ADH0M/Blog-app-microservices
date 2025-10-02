import mongoose, { Document, models, Schema, Types } from "mongoose";

export interface IPost extends Document {
  userId: Types.ObjectId;
  type: ("text" | "img")[];
  content: string;
  title:string;
}

const schema = new Schema<IPost>(
  {

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: {
      type: [String],
      enum: ["text", "img"],
      default: ["text"],
    },
    content: { type: String, required: true },
    title: { type: String, required: true },

  },
  {
    timestamps: true,
  }
);

const Post = models.Post || mongoose.model<IPost>("Post", schema);
export default Post;
