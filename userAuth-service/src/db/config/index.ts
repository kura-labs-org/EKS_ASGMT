import mongoose from 'mongoose';

try {
  mongoose.connect('mongodb://storemongo-service:27017/stores');
  console.log('Connected to MongoDB');
} catch (err: any) {
  console.log(err.toString());
}