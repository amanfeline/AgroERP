// src/server.js
// Application entry point — load env, connect DB, start HTTP server

import 'dotenv/config';
import connectDB from './config/db.js';
import app from './app.js';

const PORT = process.env.PORT || 8000;

// ─── Start ────────────────────────────────────────────────────────────────────
const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`\n🚀 AgroERP Auth Server`);
    console.log(`   Mode    : ${process.env.NODE_ENV}`);
    console.log(`   Port    : ${PORT}`);
    console.log(`   Health  : http://localhost:${PORT}/api/health`);
    console.log(`   Auth    : http://localhost:${PORT}/api/v1/auth`);
    console.log(`   Admin   : http://localhost:${PORT}/api/v1/admin\n`);
  });

  // ─── Graceful Shutdown ────────────────────────────────────────────────────
  const shutdown = (signal) => {
    console.log(`\n⚠️  ${signal} received. Closing server gracefully...`);
    server.close(() => {
      console.log('✅ HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));

  // ─── Unhandled Rejections ─────────────────────────────────────────────────
  process.on('unhandledRejection', (reason) => {
    console.error('💥 Unhandled Promise Rejection:', reason);
    server.close(() => process.exit(1));
  });
};

startServer();
