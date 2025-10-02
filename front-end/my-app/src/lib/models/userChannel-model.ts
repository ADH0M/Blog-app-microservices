
import mongoose, { Document, models, Schema, Types } from "mongoose";

export interface IUser extends Document {
  channel_id: Types.ObjectId;
  user_id: Types.ObjectId;
}

const schema = new Schema<IUser>(
  {
    channel_id: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const UserChannel = models.UserChannel || mongoose.model<IUser>("UserChannel", schema);
export default UserChannel;
