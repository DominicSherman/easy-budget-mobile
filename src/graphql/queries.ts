import {gql} from 'apollo-boost';

import {variableCategoryFragment} from './fragments';

export const getVariableCategoriesQuery = gql`
    ${variableCategoryFragment}
    
    query GetVariableCategories($userId: String!, $date: String!) {
        timePeriods (userId: $userId, date: $date) {
            timePeriodId
            variableCategories {
                ...IVariableCategory
            }
        }
    }
`;
