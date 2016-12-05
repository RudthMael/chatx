import mongoose, { Schema } from 'mongoose';

const RoomSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  adminId: {
    type: String,
    required: true
  }
});

export default mongoose.model('Room', RoomSchema);
