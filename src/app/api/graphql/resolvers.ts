import { Goal, Resolvers } from '@/@types/codegen/types';
import AssessmentModel from '@/app/models/Assessment';
import GoalModel from '@/app/models/Goal';
import StrategyModel from '@/app/models/Strategy';
import { GraphQLScalarType, Kind } from 'graphql';
import slugify from 'slugify';

const resolvers: Resolvers = {
  Query: {
    getAssessment: async (root, args) => {
      const assessment = await AssessmentModel.findOne({
        user_id: args.user_id,
        url_alias: args.url_alias,
      });

      return assessment;
    },
    getAssessments: async (root, args) => {
      const assessments = await AssessmentModel.find({
        user_id: args.user_id,
      });

      return assessments;
    },
    getAssessmentGoal: async (root, args) => {
      const goal = await GoalModel.findById(args._id);
      return goal;
    },
  },

  Assessment: {
    goals: async (assessment) => {
      const goals = await GoalModel.find({
        assessment_id: assessment._id,
      }).sort({ goal_id: 'ascending' });

      return goals as Goal[];
    },

    strategy: async (assessment) => {
      const strategy = await StrategyModel.findOne({
        assessment_id: assessment._id,
      });

      return strategy;
    },
  },

  Mutation: {
    createAssessment: async (root, args) => {
      const { user_id, title, description } = args;
      const goalsLength = 17;
      const url_alias = slugify(title, {
        lower: true,
        strict: true,
        replacement: '-',
      });

      const assessment = new AssessmentModel({
        user_id: user_id,
        title: title,
        description: description,
        url_alias: url_alias,
      });

      const assessmentGoals = [];

      try {
        const duplicateAssessment = await AssessmentModel.findOne({
          user_id,
          url_alias,
        });

        if (duplicateAssessment) {
          throw new Error(`not a unique title`);
        }

        const r = await assessment.save();

        for (let i = 1; i <= goalsLength; i++) {
          assessmentGoals.push({
            user_id: user_id,
            goal_id: i,
            assessment_id: r._id.toString(),
          });
        }
        GoalModel.collection.insertMany(assessmentGoals);

        return r;
      } catch (error) {
        return error;
      }
    },
    updateAssessment: async (root, args) => {
      const { user_id, url_alias, title, description } = args;
      const query = { user_id, url_alias };
      const update = { title, description };
      try {
        const assessment = await AssessmentModel.findOneAndUpdate(
          query,
          update,
          {
            new: true,
          },
        );
        return assessment;
      } catch (error) {
        return error;
      }
    },
    removeAssessment: async (root, args) => {
      const { _id } = args;
      try {
        const assessment = await AssessmentModel.findByIdAndDelete({ _id });
        await GoalModel.deleteMany({ assessment_id: _id });
        return assessment;
      } catch (error) {
        return error;
      }
    },
    updateGoal: async (root, args) => {
      const { _id, input } = args;
      try {
        const goal = await GoalModel.findByIdAndUpdate(_id, input, {
          new: true,
        });
        return goal;
      } catch (error) {
        return error;
      }
    },
    addOrUpdateAssessmentStrategy: async (root, args) => {
      const { assessment_id, questions, strategy } = args;
      const query = { assessment_id };
      const update = { questions, strategy };
      try {
        const strategy = await StrategyModel.findOneAndUpdate(query, update, {
          upsert: true,
          new: true,
        });
        return strategy;
      } catch (error) {
        return error;
      }
    },
  },

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
      if (value instanceof Date) {
        return value.getTime(); // Convert outgoing Date to integer for JSON
      }
      throw Error('GraphQL Date Scalar serializer expected a `Date` object');
    },
    parseValue(value) {
      if (typeof value === 'number') {
        return new Date(value); // Convert incoming integer to Date
      }
      throw new Error('GraphQL Date Scalar parser expected a `number`');
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        // Convert hard-coded AST string to integer and then to Date
        return new Date(parseInt(ast.value, 10));
      }
      // Invalid hard-coded value (not an integer)
      return null;
    },
  }),
};

export default resolvers;
