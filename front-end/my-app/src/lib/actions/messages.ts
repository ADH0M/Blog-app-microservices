"use server";

import dbConnect from "../db/dbConnect";
import Messages from "../models/messages-model";
import { Types } from "mongoose";
import { Message, SendMessageResult } from "../types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type GetMsgError = {
  msg?: string;
};

export async function sendMessage(
  {
    user_id,
    userChannel_id,
  }: { user_id: string | undefined; userChannel_id: string | undefined },
  formData: FormData
) {
  const content = formData.get("content")?.toString().trim();
  const type = formData.get("type");

  if (!user_id || !userChannel_id) {
    redirect("/login");
  }

  if (
    !Types.ObjectId.isValid(userChannel_id!) ||
    !Types.ObjectId.isValid(user_id!)
  ) {
    redirect("/login");
  }

  try {
    await dbConnect();
    const newMessage = await Messages.create({
      user_id: new Types.ObjectId(user_id),
      userChannel_id: new Types.ObjectId(userChannel_id),
      type: type === "on" ? ["text"] : ["img"],
      content,
      createdAt: new Date(),
    });

    revalidatePath("/chat/:id");
  } catch (err) {
    console.error("Error saving message:", err);
  }
}

export async function getMessages(channelId: string): Promise<Message[]> {
  if (!channelId || !Types.ObjectId.isValid(channelId)) {
    return [];
  }

  try {
    await dbConnect();
    const message = await Messages.find({ userChannel_id: channelId }).sort({
      createdAt: 1,
    });

    const data: Message[] = message.map((msg) => ({
      _id: msg._id.toString(),
      content: msg.content,
      type: msg.type,
      user_id: msg.user_id.toString(),
      createdAt: msg.createdAt.toISOString(),
      userChannel_id: msg.userChannel_id.toString(),
    }));

    return data;
  } catch (err) {
    return [];
  }
}
