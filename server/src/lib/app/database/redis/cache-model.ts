import mongoose from 'mongoose';
import SocketModel from '../mongo/socket';
import { redisClient } from '@config/db/redis';

export const getRedisSocketCached = async (receiverId: string) => {
  try {
    const data = await redisClient.get(`socket:${receiverId}`);

    const isCached = data != null;
    if (isCached) {
      const jsonData = await JSON.parse(data);
      return jsonData;
    }

    const socketData = await SocketModel.findOne({ userId: receiverId });
    if (socketData == null) return null;
    await assignRedisSocketCache(`socket:${receiverId}`, socketData);

    return socketData;
  } catch (error) {
    console.log(error);
  }
};

export const assignRedisSocketCache = async (query: string, data: Object) => {
  try {
    await redisClient.set(query, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const removeRedisSocketCachedData = async (query: string) => {
  return new Promise(async (resolve, reject) => {
    await redisClient.del(query);
    return resolve({ isDeleted: true });
  });
};
