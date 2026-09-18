import mongoose from 'mongoose';

let memoryServer = null;


export async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dostsol';
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log(`[db] connected → ${mongoose.connection.name}`);
    return true;
  } catch (err) {
    console.error(`[db] connection failed: ${err.message}`);
    if (process.env.NODE_ENV === 'production') throw err;
    console.warn('[db] running in DEGRADED mode — data routes will return 503.');
    return false;
  }
}

export function dbReady() {
  return mongoose.connection.readyState === 1;
}

export async function closeDB() {
  await mongoose.connection.close();
  if (memoryServer) await memoryServer.stop();
}
