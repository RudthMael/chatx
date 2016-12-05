import mongoose, { Schema } from 'mongoose';
import { UserSchema } from './users';

const RoomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  admin: UserSchema,
  users: [UserSchema]
});

export default mongoose.model('Room', RoomSchema);
