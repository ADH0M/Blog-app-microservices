import dbConnect from "@/lib/db/dbConnect";
import Channel from "@/lib/models/channels-model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const channels = await Channel.find({});
    return NextResponse.json(channels, { status: 200 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching channels:", error);
    return NextResponse.json(
      { error: "Failed to fetch channels", details: error.message },
      { status: 500 }
    );
  }
}
