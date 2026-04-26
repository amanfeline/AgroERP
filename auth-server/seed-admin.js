import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './src/models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');

    const email = 'admin@agro.com';
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log('Admin user already exists.');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const adminUser = new User({
      name: 'Admin User',
      email: email,
      password: hashedPassword,
      role: 'admin',
      isActive: true
    });

    await adminUser.save();
    console.log('Admin user created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
