import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Fail after 5 seconds instead of 30
      socketTimeoutMS: 45000,
    };

    console.log('Attempting to connect to MongoDB...');
    // Log first few chars to verify URI is loaded (security safe)
    if (MONGODB_URI) {
      console.log(`MONGO_URI Loaded: ${MONGODB_URI.substring(0, 15)}...`);
    } else {
      console.error('FATAL: MONGO_URI is undefined');
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB Connected Successfully!');
      return mongoose;
    }).catch(err => {
      console.error('MongoDB Connection PROMISE REJECTED:', err);
      cached.promise = null; // Reset promise on failure
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error('MongoDB Connection AWAIT FAILED:', e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
