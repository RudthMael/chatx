import mongoose from 'mongoose';

export default (callback) => {
  mongoose.connect(process.env.MONGODB_URI, err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    callback();
  });
}
