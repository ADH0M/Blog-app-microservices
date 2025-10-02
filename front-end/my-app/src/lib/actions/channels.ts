// src/lib/actions/channels.ts
import "server-only";

import dbConnect from "@/lib/db/dbConnect";
import Channel from "@/lib/models/channels-model";
import { ChannelType } from "../types";
import UserChannel from "../models/userChannel-model";
import { Types } from "mongoose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const getChannels = async (): Promise<ChannelType[]> => {
  try {
    await dbConnect();

    const channels = await Channel.find({});

    return channels.map((ch) => ({
      _id: ch._id.toString(),
      channel_name: ch.channel_name,
      channel_type: ch.channel_type,
      createdAt: ch.createdAt,
      updatedAt: ch.updatedAt,
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching channels in getChannels():", error);
    throw new Error("Failed to load channels from database.");
  }
};

export const getChannel = async (id: string) => {
  try {
    await dbConnect();

    const channel: ChannelType | null = await Channel.findById(id);

    if (!channel) {
      throw new Error("there are no users");
    }

    return [
      {
        channel_name: channel.channel_name,
        channel_type: channel.channel_type,
      },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching channels in getChannels():", error);
    throw new Error("Failed to load channels from database.");
  }
};

export const getUserChannels = async (id: string | undefined) => {
  "use server";
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    let id ;
    
    if (session) {
      const convertSession = Buffer.from(session, "base64").toString("utf-8");
      const { userId } = JSON.parse(convertSession);
      id = userId;
    } else {
      throw redirect("/login");
    }

    const userChannelDocs = await UserChannel.find({
      user_id: new Types.ObjectId(id),
    })
      .populate("channel_id")
      .exec();

    const channels = userChannelDocs.map((uc) => uc.channel_id);
    return channels;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching channels in getUserChannels():", error);
    throw new Error("Failed to load channels from database.");
  }
};
