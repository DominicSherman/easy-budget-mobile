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

export const timePeriodFragment = gql`
    fragment ITimePeriod on TimePeriod {
        timePeriodId
        beginDate
        endDate
        userId
    }
`;
