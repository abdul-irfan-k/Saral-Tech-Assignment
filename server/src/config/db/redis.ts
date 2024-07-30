import { createClient } from 'redis';

export const redisClient = createClient({
  password: 'irfan7676',
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    const developmentBuild = process.env.NODE_ENV == 'DEVELOPMENT';
    if (developmentBuild) redisClient.flushAll();
  } catch (error) {
    console.log('redis error ', error);
  }
};
