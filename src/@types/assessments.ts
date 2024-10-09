export type Assessment = {
  _id: string;
  user_id: string;
  title: string;
  description: string;
  url_alias: string;
  date?: Date;
  goals?: Goal[];
  strategy?: AssessmentStrategy;
};

export type Goal = {
  _id: string;
  user_id: string;
  assessment_id: string;
  goal_id: string;
  relevance?: number;
  impact?: number;
  motivation?: string;
  saved?: boolean;
};

export type AssessmentStrategy = {
  _id: string;
  assessment_id: string;
  questions?: Question[];
  strategy: string;
};

export type Question = {
  id?: string;
  checked?: boolean;
};
