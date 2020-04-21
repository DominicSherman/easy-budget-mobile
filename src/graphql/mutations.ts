import {gql} from 'apollo-boost';

import {
    createDebtCategoryFragment,
    createSavingCategoryFragment,
    createVariableCategoryFragment,
    debtCategoryFragment,
    expenseFragment,
    fixedCategoryFragment,
    incomeItemFragment,
    savingCategoryFragment,
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

/* Saving Category */

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
    ${savingCategoryFragment}
    
    mutation UpdateSavingCategoryMutation($savingCategory: UpdateSavingCategory!) {
        updateSavingCategory(savingCategory: $savingCategory) {
            ...ISavingCategory
        }
    }
`;

/* Debt Category */

export const createDebtCategoryMutation = gql`
    ${createDebtCategoryFragment}
    
    mutation CreateDebtCategoryMutation($debtCategory: CreateDebtCategory!) {
        createDebtCategory(debtCategory: $debtCategory) {
            ...ICreateDebtCategory
        }
    } 
`;

export const deleteDebtCategoryMutation = gql`
    mutation DeleteDebtCategoryMutation($userId: String!, $debtCategoryId: String!) {
        deleteDebtCategory(userId: $userId, debtCategoryId: $debtCategoryId)
    }
`;

export const updateDebtCategoryMutation = gql`
    ${debtCategoryFragment}
    
    mutation UpdateDebtCategoryMutation($debtCategory: UpdateDebtCategory!) {
        updateDebtCategory(debtCategory: $debtCategory) {
            ...IDebtCategory
        }
    }
`;

/* Income Item */

export const createIncomeItemMutation = gql`
    ${incomeItemFragment}
    
    mutation CreateIncomeItemMutation($incomeItem: CreateIncomeItem!) {
        createIncomeItem(incomeItem: $incomeItem) {
            ...IIncomeItem
        }
    }
`;

export const deleteIncomeItemMutation = gql`
    mutation DeleteIncomeItemMutation($userId: String!, $incomeItemId: String!) {
        deleteIncomeItem(userId: $userId, incomeItemId: $incomeItemId)
    }
`;

export const updateIncomeItemMutation = gql`
    ${incomeItemFragment}
    
    mutation UpdateIncomeItemMutation($incomeItem: UpdateIncomeItem!) {
        updateIncomeItem(incomeItem: $incomeItem) {
            ...IIncomeItem
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

export const updateTimePeriodMutation = gql`
    ${timePeriodFragment}
    
    mutation UpdateTimePeriodMutation($timePeriod: UpdateTimePeriod!) {
        updateTimePeriod(timePeriod: $timePeriod) {
            ...ITimePeriod
        }
    }
`;

export const deleteTimePeriodMutation = gql`
    mutation DeleteTimePeriodMutation($userId: String!, $timePeriodId: String!) {
        deleteTimePeriod(userId: $userId, timePeriodId: $timePeriodId)
    }
`;
