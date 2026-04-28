import fs from 'fs';
import path from 'path';
import User from '../models/User.js';

const DUMP_FILE = '/tmp/agroerp-database-dump.json';

export const loadData = async () => {
  try {
    if (fs.existsSync(DUMP_FILE)) {
      const data = fs.readFileSync(DUMP_FILE, 'utf-8');
      const users = JSON.parse(data);
      if (users && users.length > 0) {
        await User.deleteMany({});
        // Use insertMany to bypass pre-save hooks so we don't double-hash passwords
        await User.insertMany(users);
        console.log(`✅ Loaded ${users.length} users from persistent storage.`);
      }
    }
  } catch (err) {
    console.error('Error loading database dump:', err.message);
  }
};

export const saveData = async () => {
  try {
    const users = await User.find({}).select('+password +resetToken +resetTokenExpiry').lean();
    fs.writeFileSync(DUMP_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving database dump:', err.message);
  }
};
