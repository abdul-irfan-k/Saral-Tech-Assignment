import { createClient } from 'redis';

export const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    const production = process.env.NODE_ENV == 'PRODUCTION';
    if (!production) redisClient.flushAll();
  } catch (error) {
    console.log('redis error ', error);
  }
};
