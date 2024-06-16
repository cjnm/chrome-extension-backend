import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

const global1: any = global;
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global1.mongoose;

if (!cached) {
  // eslint-disable-next-line no-multi-assign
  cached = global1.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((_mongoose) => _mongoose);
  }

  try {
    // eslint-disable-next-line require-atomic-updates
    cached.conn = await cached.promise;
    // eslint-disable-next-line id-length
  } catch (e) {
    // eslint-disable-next-line require-atomic-updates
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
