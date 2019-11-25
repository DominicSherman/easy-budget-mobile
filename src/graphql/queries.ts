import {gql} from 'apollo-boost';

import {variableCategoryFragment} from './fragments';

export const getVariableCategoriesQuery = gql`
    ${variableCategoryFragment}
    
    query GetVariableCategories($userId: String!) {
        variableCategories(userId: $userId) {
            ...IVariableCategory
        }
    }
`;
