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

export const fixedCategoryFragment = gql`
    fragment IFixedCategory on FixedCategory {
        fixedCategoryId
        timePeriodId
        userId
        amount
        name
        paid
    }
`;

export const expenseFragment = gql`
    fragment IExpense on Expense {
        expenseId
        userId
        variableCategoryId
        timePeriodId
        amount
        date
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
