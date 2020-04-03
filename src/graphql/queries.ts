import {gql} from 'apollo-boost';

import {
    expenseFragment,
    fixedCategoryFragment, incomeItemFragment,
    savingCategoryFragment,
    timePeriodFragment,
    variableCategoryFragment
} from './fragments';

/* Expense */

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

export const getExpenseQuery = gql`
    ${expenseFragment}
    
    query GetExpense($userId: String!, $expenseId: String!) {
        expense(userId: $userId, expenseId: $expenseId) {
            ...IExpense
        }
    }
`;

/* Fixed Category */

export const getFixedCategoriesQuery = gql`
    ${fixedCategoryFragment}
    
    query GetFixedCategories($userId: String!, $timePeriodId: String!) {
        fixedCategories(userId: $userId, timePeriodId: $timePeriodId) {
            ...IFixedCategory
        }
    }
`;

/* Saving Category */

export const getSavingCategoriesQuery = gql`
    ${savingCategoryFragment}
    
    query GetSavingCategories($userId: String!) {
        savingCategories(userId: $userId) {
            ...ISavingCategory
        }
    }
`;

/* Income Item */

export const getIncomeItemsQuery = gql`
    ${incomeItemFragment}
    
    query GetIncomeItems($userId: String!, $timePeriodId: String!) {
        incomeItems(userId: $userId, timePeriodId: $timePeriodId) {
            ...IIncomeItem
        }
    }
`;

/* Variable Category */

export const getVariableCategoriesQuery = gql`
    ${variableCategoryFragment}
    
    query GetVariableCategories($userId: String!, $timePeriodId: String!) {
        variableCategories(userId: $userId, timePeriodId: $timePeriodId) {
            ...IVariableCategory
        }
    }
`;

export const getVariableCategoryQuery = gql`
    ${variableCategoryFragment}
    
    query GetVariableCategory($userId: String!, $variableCategoryId: String!) {
        variableCategory(userId: $userId, variableCategoryId: $variableCategoryId) {
            ...IVariableCategory
        }
    }
`;

/* Time Period */

export const getActiveTimePeriodQuery = gql`
    ${timePeriodFragment}
    
    query GetActiveTimePeriod($userId: String!, $date: String!) {
        timePeriods (userId: $userId, date: $date) {
            ...ITimePeriod
        }
    }
`;

/* Screen */

export const homeScreenQuery = gql`
    ${timePeriodFragment}
    ${fixedCategoryFragment}
    ${variableCategoryFragment}
    ${expenseFragment}
    ${savingCategoryFragment}
    ${incomeItemFragment}
    
    query HomeScreenQuery($userId: String!, $date: String!, $timePeriodId: String!) {
        timePeriods (userId: $userId, date: $date) {
            ...ITimePeriod
        }
        expenses (userId: $userId, timePeriodId: $timePeriodId) {
            ...IExpense
        }
        variableCategories (userId: $userId, timePeriodId: $timePeriodId) {
            ...IVariableCategory
        }
        fixedCategories (userId: $userId, timePeriodId: $timePeriodId) {
            ...IFixedCategory
        }
        savingCategories(userId: $userId) {
            ...ISavingCategory
        }
        incomeItems(userId: $userId, timePeriodId: $timePeriodId) {
            ...IIncomeItem
        }
    }
`;
