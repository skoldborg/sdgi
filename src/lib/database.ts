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
      await mongoose.connect('mongodb+srv://vercel-admin-user:ieNQzy7ADEiAoj7Q@cluster0.w4wla.mongodb.net/siat?retryWrites=true&w=majority&appName=Cluster0');
      console.log('🎉 connected to database successfully');
    }
  } catch (error) {
    console.error(error);
  }
};
