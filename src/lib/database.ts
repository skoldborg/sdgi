import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  mongoose.set('strictQuery', true);

  try {
    if (uri) {
      await mongoose.connect(uri);
      console.log('🎉 connected to database successfully');
    }
  } catch (error) {
    console.error(error);
  }
};
