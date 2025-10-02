import mongoose, { Document, models, Schema } from "mongoose";

export interface IUser extends Document {
  channel_name: string;
  channel_type: string;
};

const userSchema = new Schema<IUser>(
  {
    channel_name: { type: String, required: true, trim: true },
    channel_type:{ type: String, required:true ,trim:true },
},
  {
    timestamps: true,
  }
);

const Channel = models.Channel || mongoose.model<IUser>("Channel", userSchema);
export default Channel;
