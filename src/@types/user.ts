import { ObjectId } from 'mongoose';
import { Assessment } from './assessments';

export type User = {
  _id: ObjectId;
  user_id: string;
  assessments?: [Assessment];
};
