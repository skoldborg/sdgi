import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

export const connectDB = async () => {
  mongoose.set('strictQuery', true);

  if (mongoose.connection.readyState >= 1) {
    console.log('MongoDB is already connected');
    return;
  }
  try {
    if (uri) {
      await mongoose.connect(uri);
      console.log('🎉 connected to database successfully');
    }
  } catch (error) {
    console.error(error);
  }
};
