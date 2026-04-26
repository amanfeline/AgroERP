// src/config/db.js
// MongoDB connection via Mongoose with Fallback to In-Memory DB

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

/**
 * Connect to MongoDB using the MONGO_URI environment variable.
 * If the connection fails, it falls back to an in-memory MongoDB instance for local development.
 */
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    
    try {
      console.log('Attempting to connect to primary MongoDB...');
      // Try to connect with a short timeout to fail fast if credentials are wrong
      const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      console.log(`✅ MongoDB connected: ${conn.connection.host}`);
      return;
    } catch (err) {
      console.warn(`⚠️ Primary MongoDB connection failed: ${err.message}`);
      console.log('🔄 Falling back to local in-memory database...');
    }

    // Fallback: Start an in-memory MongoDB instance
    const mongoServer = await MongoMemoryServer.create();
    const fallbackUri = mongoServer.getUri();
    
    const conn = await mongoose.connect(fallbackUri);
    console.log(`✅ In-Memory MongoDB connected: ${conn.connection.host}`);
    
  } catch (err) {
    console.error(`❌ All MongoDB connections failed: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
