const mongoose = require('mongoose');

try {
  mongoose.connect('mongodb://usermongo-service:27017/userauth');
  console.log('Connected to MongoDB');
} catch (e) {
  console.log(e.toString());
}