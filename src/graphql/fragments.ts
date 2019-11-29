import {gql} from 'apollo-boost';

export const variableCategoryFragment = gql`
    fragment IVariableCategory on VariableCategory {
        variableCategoryId
        timePeriodId
        userId
        amount
        name
    }
`;
