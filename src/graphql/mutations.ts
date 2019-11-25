import {gql} from 'apollo-boost';

import {variableCategoryFragment} from './fragments';

export const createVariableCategoryMutation = gql`
    ${variableCategoryFragment}
    
    mutation CreateVariableCategory($variableCategory: CreateVariableCategory!) {
        createVariableCategory(variableCategory: $variableCategory) {
            ...IVariableCategory
        }
    } 
`;
