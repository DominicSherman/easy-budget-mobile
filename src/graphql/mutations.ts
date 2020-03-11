import {gql} from 'apollo-boost';

import {
    createSavingCategoryFragment,
    createVariableCategoryFragment,
    expenseFragment,
    fixedCategoryFragment,
    timePeriodFragment
} from './fragments';

/* Expense */

export const createExpenseMutation = gql`
    ${expenseFragment}
    
    mutation CreateExpenseMutation($expense: CreateExpense!) {
        createExpense(expense: $expense) {
            ...IExpense
        }
    }
`;

export const deleteExpenseMutation = gql`
    mutation DeleteExpenseMutation($userId: String!, $expenseId: String!) {
        deleteExpense(userId: $userId, expenseId: $expenseId)
    }
`;

export const updateExpenseMutation = gql`
    ${expenseFragment}
    
    mutation UpdateExpenseMutation($expense: UpdateExpense!) {
        updateExpense(expense: $expense) {
            ...IExpense
        }
    }
`;

/* Fixed Category */

export const createFixedCategoryMutation = gql`
    ${fixedCategoryFragment}
    
    mutation CreateFixedCategoryMutation($fixedCategory: CreateFixedCategory!) {
        createFixedCategory(fixedCategory: $fixedCategory) {
            ...IFixedCategory
        }
    } 
`;

export const deleteFixedCategoryMutation = gql`
    mutation DeleteFixedCategoryMutation($userId: String!, $fixedCategoryId: String!) {
        deleteFixedCategory(userId: $userId, fixedCategoryId: $fixedCategoryId) 
    }
`;

export const updateFixedCategoryMutation = gql`
    ${fixedCategoryFragment}
    
    mutation UpdateFixedCategoryMutation($fixedCategory: UpdateFixedCategory!) {
        updateFixedCategory(fixedCategory: $fixedCategory) {
            ...IFixedCategory
        }
    }
`;

/* Saving */

export const createSavingCategoryMutation = gql`
    ${createSavingCategoryFragment}
    
    mutation CreateSavingCategoryMutation($savingCategory: CreateSavingCategory!) {
        createSavingCategory(savingCategory: $savingCategory) {
            ...ICreateSavingCategory
        }
    } 
`;

export const deleteSavingCategoryMutation = gql`
    mutation DeleteSavingCategoryMutation($userId: String!, $savingCategoryId: String!) {
        deleteSavingCategory(userId: $userId, savingCategoryId: $savingCategoryId)
    }
`;

export const updateSavingCategoryMutation = gql`
    ${createSavingCategoryFragment}
    
    mutation UpdateSavingCategoryMutation($savingCategory: UpdateSavingCategory!) {
        updateSavingCategory(savingCategory: $savingCategory) {
            ...ICreateSavingCategory
        }
    }
`;

/* Variable Category */

export const createVariableCategoryMutation = gql`
    ${createVariableCategoryFragment}
    
    mutation CreateVariableCategoryMutation($variableCategory: CreateVariableCategory!) {
        createVariableCategory(variableCategory: $variableCategory) {
            ...ICreateVariableCategory
        }
    } 
`;

export const deleteVariableCategoryMutation = gql`
    mutation DeleteVariableCategoryMutation($userId: String!, $variableCategoryId: String!) {
        deleteVariableCategory(userId: $userId, variableCategoryId: $variableCategoryId)
    }
`;

export const updateVariableCategoryMutation = gql`
    ${createVariableCategoryFragment}
    
    mutation UpdateVariableCategoryMutation($variableCategory: UpdateVariableCategory!) {
        updateVariableCategory(variableCategory: $variableCategory) {
            ...ICreateVariableCategory
        }
    }
`;

/* Time Period */

export const createTimePeriodMutation = gql`
    ${timePeriodFragment}
    
    mutation CreateTimePeriodMutation($timePeriod: CreateTimePeriod!) {
        createTimePeriod(timePeriod: $timePeriod) {
            ...ITimePeriod
        }
    }
`;
