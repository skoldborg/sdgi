const typeDefs = `#graphql
  scalar Date

  type User {
      _id: ID!
      user_id: ID!
      assessments: [Assessment]
  }

  type Assessment {
      _id: ID!
      user_id: ID!
      title: String!
      description: String!
      url_alias: String!
      date: Date
      goals: [Goal]
      strategy: AssessmentStrategy
  }

  type Goal {
      _id: ID!
      user_id: ID!
      assessment_id: ID!
      goal_id: Int!
      relevance: Int
      impact: Int
      motivation: String
      saved: Boolean
  }

  type AssessmentStrategy {
      _id: ID!
      assessment_id: ID!
      questions: [Question]
      strategy: String!
  }

  type Question {
      id: String
      checked: Boolean
  }

  # The schema allows the following queries:
  type Query {
      getUser(user_id: ID!): User
      getAssessment(user_id: ID!, url_alias: String!): Assessment
      getAssessmentGoal(_id: ID!): Goal
  }

  type Mutation {
      createAssessment(user_id: ID!, title: String!, description: String!): Assessment
      updateAssessment(user_id: ID!, url_alias: String!, title: String!, description: String!): Assessment
      updateGoal(_id: ID!, input: GoalInput!): Goal
      removeAssessment(_id: ID!): Assessment
      addOrUpdateAssessmentStrategy(assessment_id: ID!, questions: [QuestionInput!], strategy: String!): AssessmentStrategy
  }

  input GoalInput {
      impact: Int
      motivation: String
      relevance: Int
      saved: Boolean
  }

  input QuestionInput {
      id: String,
      checked: Boolean
  }
`;

export default typeDefs;
