import 'server-only';
import mongoose from "mongoose";

const mongoDb_uri = process.env.MONGODB_URI;

if (!mongoDb_uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

declare global {
  var mongooseCached:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCached?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

globalForMongoose.mongooseCached = globalForMongoose.mongooseCached || {
  conn: null,
  promise: null,
};

async function dbConnect(): Promise<typeof mongoose> {
  const cached = globalForMongoose.mongooseCached!;

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoDb_uri!, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    cached.promise = null;
    throw new Error("MongoDB connection failed: " + e.message);
  }

  return cached.conn;
}

export default dbConnect;
