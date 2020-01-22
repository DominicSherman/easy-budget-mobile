import {gql} from 'apollo-boost';

import {fixedCategoryFragment, variableCategoryFragment} from './fragments';

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
