import mongoose, { Document, models, Schema, Types } from "mongoose";

export interface IUser extends Document {
  userChannel_id: Types.ObjectId;
  user_id: Types.ObjectId;
  type: ("text" | "img")[];
  content: string;
}

const schema = new Schema<IUser>(
  {
    userChannel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserChannel",
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: {
      type: [String],
      enum: ["text", "img"],
      default: ["text"],
    },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Messages = models.Messages || mongoose.model<IUser>("Messages", schema);
export default Messages;
