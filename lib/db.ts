import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI!;
const MAX_RETRIES = 3;
const RETRY_DELAY = 4000;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectOptions = {
  bufferCommands: true, // Changed to true to allow buffering
  dbName: "Voting_System",
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 30000, // Increased timeout
  socketTimeoutMS: 45000,
  family: 4,
};

async function connectDB() {
  if (cached.conn) {
    console.log("✅ Using cached connection");
    return cached.conn;
  }

  try {
    console.log("🔄 Connecting to MongoDB Atlas...");

    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI, connectOptions);
    }

    cached.conn = await cached.promise;

    // Verify connection is ready
    await new Promise((resolve) => {
      if (cached.conn?.connection?.readyState === 1) {
        resolve(true);
      }
      cached.conn?.connection?.once("connected", resolve);
    });

    console.log("✅ MongoDB Connected Successfully");
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    cached.promise = null;
    cached.conn = null;
    throw error;
  }
}

export default connectDB;
