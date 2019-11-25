import {gql} from 'apollo-boost';

import {variableCategoryFragment} from './fragments';

export const createVariableCategoryMutation = gql`
    ${variableCategoryFragment}
    
    mutation CreateVariableCategoryMutation($variableCategory: CreateVariableCategory!) {
        createVariableCategory(variableCategory: $variableCategory) {
            ...IVariableCategory
        }
    } 
`;
