import {gql} from 'apollo-boost';

import {expenseFragment, fixedCategoryFragment, timePeriodFragment, variableCategoryFragment} from './fragments';

export const getVariableCategoriesQuery = gql`
    ${variableCategoryFragment}
    ${expenseFragment}
    
    query GetVariableCategories($userId: String!, $timePeriodId: String!) {
        variableCategories(userId: $userId, timePeriodId: $timePeriodId) {
            ...IVariableCategory
        }
        expenses(userId: $userId, timePeriodId: $timePeriodId) {
            ...IExpense
        }
    }
`;

export const getFixedCategoriesQuery = gql`
    ${fixedCategoryFragment}
    
    query GetFixedCategories($userId: String!, $timePeriodId: String!) {
        fixedCategories(userId: $userId, timePeriodId: $timePeriodId) {
            ...IFixedCategory
        }
    }
`;

export const getExpensesQuery = gql`
    ${expenseFragment}
    ${variableCategoryFragment}
    
    query GetExpenses($userId: String!, $timePeriodId: String!) {
        expenses(userId: $userId, timePeriodId: $timePeriodId) {
            ...IExpense
        }
        variableCategories(userId: $userId, timePeriodId: $timePeriodId) {
            ...IVariableCategory
        }
    }
`;

export const getActiveTimePeriodQuery = gql`
    ${timePeriodFragment}
    
    query GetActiveTimePeriod($userId: String!, $date: String!) {
        timePeriods (userId: $userId, date: $date) {
            ...ITimePeriod
        }
    }
`;
