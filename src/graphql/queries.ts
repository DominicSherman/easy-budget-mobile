import {gql} from 'apollo-boost';

export const getVariableCategoriesQuery = gql`
  query GetVariableCategories($userId: String!) {
    variableCategories(userId: $userId) {
      userId
      variableCategoryId
      name
      amount
    }
  }
`;
