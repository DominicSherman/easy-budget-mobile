import {gql} from 'apollo-boost';

import {
    debtCategoryFragment,
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

/* Debt Category */

export const getDebtCategoriesQuery = gql`
    ${debtCategoryFragment}
    
    query GetDebtCategories($userId: String!) {
        debtCategories(userId: $userId) {
            ...IDebtCategory
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

export const getTimePeriodsQuery = gql`
    ${timePeriodFragment}
    
    query GetTimePeriods($userId: String!) {
        timePeriods (userId: $userId) {
            ...ITimePeriod
        }
    }
`;

export const getTimePeriodQuery = gql`
    ${timePeriodFragment}
    
    query GetTimePeriod($userId: String!, $timePeriodId: String!) {
        timePeriod (userId: $userId, timePeriodId: $timePeriodId) {
            ...ITimePeriod
        }
    }
`;

/* Screen */

export const homeScreenQuery = gql`
    ${fixedCategoryFragment}
    ${variableCategoryFragment}
    ${expenseFragment}
    ${savingCategoryFragment}
    ${incomeItemFragment}
    ${debtCategoryFragment}
    
    query HomeScreenQuery($userId: String!, $timePeriodId: String!) {
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
        debtCategories(userId: $userId) {
            ...IDebtCategory
        }
        incomeItems(userId: $userId, timePeriodId: $timePeriodId) {
            ...IIncomeItem
        }
    }
`;
