import './users';
import mongoose, { Schema } from 'mongoose';

const RoomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  admin: { type: Schema.Types.ObjectId, ref: 'User' },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model('Room', RoomSchema);
