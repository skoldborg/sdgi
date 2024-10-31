/* eslint-disable */
// @ts-nocheck
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Assessment = {
  __typename?: 'Assessment';
  _id: Scalars['ID']['output'];
  date?: Maybe<Scalars['Date']['output']>;
  description: Scalars['String']['output'];
  goals?: Maybe<Array<Maybe<Goal>>>;
  strategy?: Maybe<AssessmentStrategy>;
  title: Scalars['String']['output'];
  url_alias: Scalars['String']['output'];
  user_id: Scalars['ID']['output'];
};

export type AssessmentStrategy = {
  __typename?: 'AssessmentStrategy';
  _id: Scalars['ID']['output'];
  assessment_id: Scalars['ID']['output'];
  questions?: Maybe<Array<Maybe<Question>>>;
  strategy: Scalars['String']['output'];
};

export type Goal = {
  __typename?: 'Goal';
  _id: Scalars['ID']['output'];
  assessment_id: Scalars['ID']['output'];
  goal_id: Scalars['Int']['output'];
  impact?: Maybe<Scalars['Int']['output']>;
  motivation?: Maybe<Scalars['String']['output']>;
  relevance?: Maybe<Scalars['Int']['output']>;
  saved?: Maybe<Scalars['Boolean']['output']>;
  user_id: Scalars['ID']['output'];
};

export type GoalInput = {
  impact?: InputMaybe<Scalars['Int']['input']>;
  motivation?: InputMaybe<Scalars['String']['input']>;
  relevance?: InputMaybe<Scalars['Int']['input']>;
  saved?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addOrUpdateAssessmentStrategy?: Maybe<AssessmentStrategy>;
  createAssessment?: Maybe<Assessment>;
  removeAssessment?: Maybe<Assessment>;
  updateAssessment?: Maybe<Assessment>;
  updateGoal?: Maybe<Goal>;
};


export type MutationAddOrUpdateAssessmentStrategyArgs = {
  assessment_id: Scalars['ID']['input'];
  questions?: InputMaybe<Array<QuestionInput>>;
  strategy: Scalars['String']['input'];
};


export type MutationCreateAssessmentArgs = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
  user_id: Scalars['ID']['input'];
};


export type MutationRemoveAssessmentArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationUpdateAssessmentArgs = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url_alias: Scalars['String']['input'];
  user_id: Scalars['ID']['input'];
};


export type MutationUpdateGoalArgs = {
  _id: Scalars['ID']['input'];
  input: GoalInput;
};

export type Query = {
  __typename?: 'Query';
  getAssessment?: Maybe<Assessment>;
  getAssessmentGoal?: Maybe<Goal>;
  getAssessments?: Maybe<Array<Maybe<Assessment>>>;
};


export type QueryGetAssessmentArgs = {
  url_alias: Scalars['String']['input'];
  user_id: Scalars['ID']['input'];
};


export type QueryGetAssessmentGoalArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryGetAssessmentsArgs = {
  user_id: Scalars['ID']['input'];
};

export type Question = {
  __typename?: 'Question';
  checked?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

export type QuestionInput = {
  checked?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Assessment: ResolverTypeWrapper<Assessment>;
  AssessmentStrategy: ResolverTypeWrapper<AssessmentStrategy>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Goal: ResolverTypeWrapper<Goal>;
  GoalInput: GoalInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<Question>;
  QuestionInput: QuestionInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Assessment: Assessment;
  AssessmentStrategy: AssessmentStrategy;
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  Goal: Goal;
  GoalInput: GoalInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  Question: Question;
  QuestionInput: QuestionInput;
  String: Scalars['String']['output'];
};

export type AssessmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Assessment'] = ResolversParentTypes['Assessment']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  goals?: Resolver<Maybe<Array<Maybe<ResolversTypes['Goal']>>>, ParentType, ContextType>;
  strategy?: Resolver<Maybe<ResolversTypes['AssessmentStrategy']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url_alias?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AssessmentStrategyResolvers<ContextType = any, ParentType extends ResolversParentTypes['AssessmentStrategy'] = ResolversParentTypes['AssessmentStrategy']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  assessment_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  questions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Question']>>>, ParentType, ContextType>;
  strategy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GoalResolvers<ContextType = any, ParentType extends ResolversParentTypes['Goal'] = ResolversParentTypes['Goal']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  assessment_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  goal_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  impact?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  motivation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  relevance?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  saved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addOrUpdateAssessmentStrategy?: Resolver<Maybe<ResolversTypes['AssessmentStrategy']>, ParentType, ContextType, RequireFields<MutationAddOrUpdateAssessmentStrategyArgs, 'assessment_id' | 'strategy'>>;
  createAssessment?: Resolver<Maybe<ResolversTypes['Assessment']>, ParentType, ContextType, RequireFields<MutationCreateAssessmentArgs, 'description' | 'title' | 'user_id'>>;
  removeAssessment?: Resolver<Maybe<ResolversTypes['Assessment']>, ParentType, ContextType, RequireFields<MutationRemoveAssessmentArgs, '_id'>>;
  updateAssessment?: Resolver<Maybe<ResolversTypes['Assessment']>, ParentType, ContextType, RequireFields<MutationUpdateAssessmentArgs, 'description' | 'title' | 'url_alias' | 'user_id'>>;
  updateGoal?: Resolver<Maybe<ResolversTypes['Goal']>, ParentType, ContextType, RequireFields<MutationUpdateGoalArgs, '_id' | 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAssessment?: Resolver<Maybe<ResolversTypes['Assessment']>, ParentType, ContextType, RequireFields<QueryGetAssessmentArgs, 'url_alias' | 'user_id'>>;
  getAssessmentGoal?: Resolver<Maybe<ResolversTypes['Goal']>, ParentType, ContextType, RequireFields<QueryGetAssessmentGoalArgs, '_id'>>;
  getAssessments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Assessment']>>>, ParentType, ContextType, RequireFields<QueryGetAssessmentsArgs, 'user_id'>>;
};

export type QuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = {
  checked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Assessment?: AssessmentResolvers<ContextType>;
  AssessmentStrategy?: AssessmentStrategyResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Goal?: GoalResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
};

