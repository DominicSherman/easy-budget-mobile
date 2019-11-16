import {gql} from 'apollo-boost';

export const getVariableExpensesQuery = gql`
  query GetVariableExpensesQuery($userId: String!) {
    variableCategories(userId: $userId) {
      userId
      variableCategoryId
      name
      amount
    }
  }
`;
