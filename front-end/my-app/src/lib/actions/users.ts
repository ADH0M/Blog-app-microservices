// src/lib/actions/channels.ts
import "server-only";

import dbConnect from "@/lib/db/dbConnect";
import User, { IUser } from "../models/user-model";

export const getUser = async (id:string) => {
  try {
    await dbConnect();

    const user : IUser | null = await User.findById(id);

    if(!user){
        throw new Error('there are no users')
    }

    return [{username :user.username, phone:user.phone , isActive :user.active}]

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching channels in getChannels():", error);
    throw new Error("Failed to load channels from database.");
  }
};
