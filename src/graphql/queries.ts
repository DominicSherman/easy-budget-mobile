import {gql} from 'apollo-boost';

import {timePeriodFragment, variableCategoryFragment} from './fragments';

export const getVariableCategoriesQuery = gql`
    ${variableCategoryFragment}
    
    query GetVariableCategories($userId: String!, $timePeriodId: String!) {
        variableCategories(userId: $userId, timePeriodId: $timePeriodId) {
            ...IVariableCategory
        }
    }
`;

export const getActiveTimePeriodQuery = gql`
    ${timePeriodFragment}
    
    query GetActiveTimePeriod($userId: String!, $date: String!) {
        timePeriods (userId: $userId, date: $date) {
            ...ITimePeriod
        }
    }
`;
