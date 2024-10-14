import mongoose from 'mongoose';

import { GoalSchema } from './Goal';

const AssessmentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    trim: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url_alias: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  goals: [GoalSchema],
});

export default mongoose.models.Assessment ||
  mongoose.model('Assessment', AssessmentSchema);
