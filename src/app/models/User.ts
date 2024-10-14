import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
