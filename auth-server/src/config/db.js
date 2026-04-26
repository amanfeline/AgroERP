// src/config/db.js
// MongoDB connection via Mongoose

import mongoose from 'mongoose';

/**
 * Connect to MongoDB using the MONGO_URI environment variable.
 * Exits the process if the connection fails to prevent a partially-started server.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
