/* eslint-disable */
// @ts-nocheck
import * as Types from '../src/@types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', user_id: string, assessments?: Array<{ __typename?: 'Assessment', _id: string, user_id: string, title: string, description: string, url_alias: string, date?: any | null, goals?: Array<{ __typename?: 'Goal', user_id: string, assessment_id: string, goal_id: number, relevance?: number | null, impact?: number | null, motivation?: string | null, saved?: boolean | null } | null> | null, strategy?: { __typename?: 'AssessmentStrategy', assessment_id: string, strategy: string, questions?: Array<{ __typename?: 'Question', id?: string | null, checked?: boolean | null } | null> | null } | null } | null> | null } | null };

export type GetAssessmentQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
  urlAlias: Types.Scalars['String']['input'];
}>;


export type GetAssessmentQuery = { __typename?: 'Query', getAssessment?: { __typename?: 'Assessment', _id: string, user_id: string, title: string, description: string, url_alias: string, date?: any | null, goals?: Array<{ __typename?: 'Goal', _id: string, user_id: string, assessment_id: string, goal_id: number, relevance?: number | null, impact?: number | null, motivation?: string | null, saved?: boolean | null } | null> | null, strategy?: { __typename?: 'AssessmentStrategy', assessment_id: string, strategy: string, questions?: Array<{ __typename?: 'Question', id?: string | null, checked?: boolean | null } | null> | null } | null } | null };

export type CreateAssessmentMutationVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
  title: Types.Scalars['String']['input'];
  description: Types.Scalars['String']['input'];
}>;


export type CreateAssessmentMutation = { __typename?: 'Mutation', createAssessment?: { __typename?: 'Assessment', title: string } | null };

export type RemoveAssessmentMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type RemoveAssessmentMutation = { __typename?: 'Mutation', removeAssessment?: { __typename?: 'Assessment', _id: string, user_id: string, title: string, description: string, url_alias: string, date?: any | null, goals?: Array<{ __typename?: 'Goal', _id: string, user_id: string, assessment_id: string, goal_id: number, relevance?: number | null, impact?: number | null, motivation?: string | null, saved?: boolean | null } | null> | null, strategy?: { __typename?: 'AssessmentStrategy', _id: string, assessment_id: string, strategy: string, questions?: Array<{ __typename?: 'Question', id?: string | null, checked?: boolean | null } | null> | null } | null } | null };

export type UpdateAssessmentMutationVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
  urlAlias: Types.Scalars['String']['input'];
  title: Types.Scalars['String']['input'];
  description: Types.Scalars['String']['input'];
}>;


export type UpdateAssessmentMutation = { __typename?: 'Mutation', updateAssessment?: { __typename?: 'Assessment', title: string, description: string } | null };


export const GetUserDocument = gql`
    query GetUser($userId: ID!) {
  getUser(user_id: $userId) {
    user_id
    assessments {
      _id
      user_id
      title
      description
      url_alias
      date
      goals {
        user_id
        assessment_id
        goal_id
        relevance
        impact
        motivation
        saved
      }
      strategy {
        assessment_id
        strategy
        questions {
          id
          checked
        }
      }
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetAssessmentDocument = gql`
    query GetAssessment($userId: ID!, $urlAlias: String!) {
  getAssessment(user_id: $userId, url_alias: $urlAlias) {
    _id
    user_id
    title
    description
    url_alias
    date
    goals {
      _id
      user_id
      assessment_id
      goal_id
      relevance
      impact
      motivation
      saved
    }
    strategy {
      assessment_id
      strategy
      questions {
        id
        checked
      }
    }
  }
}
    `;

/**
 * __useGetAssessmentQuery__
 *
 * To run a query within a React component, call `useGetAssessmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssessmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssessmentQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      urlAlias: // value for 'urlAlias'
 *   },
 * });
 */
export function useGetAssessmentQuery(baseOptions: Apollo.QueryHookOptions<GetAssessmentQuery, GetAssessmentQueryVariables> & ({ variables: GetAssessmentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssessmentQuery, GetAssessmentQueryVariables>(GetAssessmentDocument, options);
      }
export function useGetAssessmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssessmentQuery, GetAssessmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssessmentQuery, GetAssessmentQueryVariables>(GetAssessmentDocument, options);
        }
export function useGetAssessmentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAssessmentQuery, GetAssessmentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAssessmentQuery, GetAssessmentQueryVariables>(GetAssessmentDocument, options);
        }
export type GetAssessmentQueryHookResult = ReturnType<typeof useGetAssessmentQuery>;
export type GetAssessmentLazyQueryHookResult = ReturnType<typeof useGetAssessmentLazyQuery>;
export type GetAssessmentSuspenseQueryHookResult = ReturnType<typeof useGetAssessmentSuspenseQuery>;
export type GetAssessmentQueryResult = Apollo.QueryResult<GetAssessmentQuery, GetAssessmentQueryVariables>;
export const CreateAssessmentDocument = gql`
    mutation CreateAssessment($userId: ID!, $title: String!, $description: String!) {
  createAssessment(user_id: $userId, title: $title, description: $description) {
    title
  }
}
    `;
export type CreateAssessmentMutationFn = Apollo.MutationFunction<CreateAssessmentMutation, CreateAssessmentMutationVariables>;

/**
 * __useCreateAssessmentMutation__
 *
 * To run a mutation, you first call `useCreateAssessmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssessmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssessmentMutation, { data, loading, error }] = useCreateAssessmentMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateAssessmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateAssessmentMutation, CreateAssessmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAssessmentMutation, CreateAssessmentMutationVariables>(CreateAssessmentDocument, options);
      }
export type CreateAssessmentMutationHookResult = ReturnType<typeof useCreateAssessmentMutation>;
export type CreateAssessmentMutationResult = Apollo.MutationResult<CreateAssessmentMutation>;
export type CreateAssessmentMutationOptions = Apollo.BaseMutationOptions<CreateAssessmentMutation, CreateAssessmentMutationVariables>;
export const RemoveAssessmentDocument = gql`
    mutation RemoveAssessment($id: ID!) {
  removeAssessment(_id: $id) {
    _id
    user_id
    title
    description
    url_alias
    date
    goals {
      _id
      user_id
      assessment_id
      goal_id
      relevance
      impact
      motivation
      saved
    }
    strategy {
      _id
      assessment_id
      questions {
        id
        checked
      }
      strategy
    }
  }
}
    `;
export type RemoveAssessmentMutationFn = Apollo.MutationFunction<RemoveAssessmentMutation, RemoveAssessmentMutationVariables>;

/**
 * __useRemoveAssessmentMutation__
 *
 * To run a mutation, you first call `useRemoveAssessmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAssessmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAssessmentMutation, { data, loading, error }] = useRemoveAssessmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveAssessmentMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAssessmentMutation, RemoveAssessmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveAssessmentMutation, RemoveAssessmentMutationVariables>(RemoveAssessmentDocument, options);
      }
export type RemoveAssessmentMutationHookResult = ReturnType<typeof useRemoveAssessmentMutation>;
export type RemoveAssessmentMutationResult = Apollo.MutationResult<RemoveAssessmentMutation>;
export type RemoveAssessmentMutationOptions = Apollo.BaseMutationOptions<RemoveAssessmentMutation, RemoveAssessmentMutationVariables>;
export const UpdateAssessmentDocument = gql`
    mutation UpdateAssessment($userId: ID!, $urlAlias: String!, $title: String!, $description: String!) {
  updateAssessment(
    user_id: $userId
    url_alias: $urlAlias
    title: $title
    description: $description
  ) {
    title
    description
  }
}
    `;
export type UpdateAssessmentMutationFn = Apollo.MutationFunction<UpdateAssessmentMutation, UpdateAssessmentMutationVariables>;

/**
 * __useUpdateAssessmentMutation__
 *
 * To run a mutation, you first call `useUpdateAssessmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAssessmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAssessmentMutation, { data, loading, error }] = useUpdateAssessmentMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      urlAlias: // value for 'urlAlias'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateAssessmentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAssessmentMutation, UpdateAssessmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAssessmentMutation, UpdateAssessmentMutationVariables>(UpdateAssessmentDocument, options);
      }
export type UpdateAssessmentMutationHookResult = ReturnType<typeof useUpdateAssessmentMutation>;
export type UpdateAssessmentMutationResult = Apollo.MutationResult<UpdateAssessmentMutation>;
export type UpdateAssessmentMutationOptions = Apollo.BaseMutationOptions<UpdateAssessmentMutation, UpdateAssessmentMutationVariables>;