import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  id: String,
  checked: Boolean,
});

export const StrategySchema = new mongoose.Schema({
  assessment_id: String,
  questions: {
    type: [QuestionSchema],
    required: true,
  },
  strategy: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Strategy ||
  mongoose.model('Strategy', StrategySchema);
