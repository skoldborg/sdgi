import mongoose from 'mongoose';

export const GoalSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  assessment_id: {
    type: String,
    required: true,
  },
  goal_id: {
    type: Number,
    required: true,
  },
  relevance: Number,
  impact: Number,
  motivation: String,
  saved: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Goal || mongoose.model('Goal', GoalSchema);
