import mongoose from 'mongoose';

export const connectDB = async () => {
  const dbUrl =
    process.env.DB_URL ?? 'mongodb://localhost:27017/happy-zone-assignment';
  await mongoose.connect(dbUrl);
};
