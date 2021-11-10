import mongoose from 'mongoose';

try {
  mongoose.connect('mongodb://store-mongo-srv:27017/auth');
  console.log('Connected to MongoDB');
} catch (err: any) {
  console.log(err.toString());
}