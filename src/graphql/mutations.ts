import {gql} from 'apollo-boost';

import {createVariableCategoryFragment, expenseFragment, fixedCategoryFragment, timePeriodFragment} from './fragments';

export const createVariableCategoryMutation = gql`
    ${createVariableCategoryFragment}
    
    mutation CreateVariableCategoryMutation($variableCategory: CreateVariableCategory!) {
        createVariableCategory(variableCategory: $variableCategory) {
            ...ICreateVariableCategory
        }
    } 
`;

export const createFixedCategoryMutation = gql`
    ${fixedCategoryFragment}
    
    mutation CreateFixedCategoryMutation($fixedCategory: CreateFixedCategory!) {
        createFixedCategory(fixedCategory: $fixedCategory) {
            ...IFixedCategory
        }
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

export const updateVariableCategoryMutation = gql`
    ${createVariableCategoryFragment}
    
    mutation UpdateVariableCategoryMutation($variableCategory: UpdateVariableCategory!) {
        updateVariableCategory(variableCategory: $variableCategory) {
            ...ICreateVariableCategory
        }
    }
`;

export const createExpenseMutation = gql`
    ${expenseFragment}
    
    mutation CreateExpenseMutation($expense: CreateExpense!) {
        createExpense(expense: $expense) {
            ...IExpense
        }
    }
`;

export const createTimePeriodMutation = gql`
    ${timePeriodFragment}
    
    mutation CreateTimePeriodMutation($timePeriod: CreateTimePeriod!) {
        createTimePeriod(timePeriod: $timePeriod) {
            ...ITimePeriod
        }
    }
`;
