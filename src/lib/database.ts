import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

let isConnected = false;

export const connectDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
  }

  try {
    if (uri) {
      await mongoose.connect(uri);

      isConnected = true;
      console.log('🎉 connected to database successfully');
    }
  } catch (error) {
    console.error(error);
  }
};
