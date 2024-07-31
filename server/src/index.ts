import dotenv from 'dotenv';
import http from 'http';
import * as socketIo from 'socket.io';
dotenv.config();

import { app } from './app';
import { connectDB } from '@config/db/mongo';
import { connectRedis } from '@config/db/redis';
import { SocketMessageService } from '@lib/service/socket';

const server = http.createServer(app);

const port = process.env.PORT || 8000;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

const startApp = async () => {
  await connectDB();
  await connectRedis();
  const io = new socketIo.Server(server, {
    cors: {
      origin: [frontendUrl],
    },
  });

  io.on('connection', async (socket) => {
    new SocketMessageService(io, socket).listen();
  });

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};
startApp();
