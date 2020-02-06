import {gql} from 'apollo-boost';

import {expenseFragment, fixedCategoryFragment, timePeriodFragment, variableCategoryFragment} from './fragments';

export const createVariableCategoryMutation = gql`
    ${variableCategoryFragment}
    
    mutation CreateVariableCategoryMutation($variableCategory: CreateVariableCategory!) {
        createVariableCategory(variableCategory: $variableCategory) {
            ...IVariableCategory
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
