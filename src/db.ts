import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const dbURI = 'mongodb://0.0.0.0:27017/local'; // Change this to your MongoDB URI


    await mongoose.connect(dbURI);

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;
