import {gql} from 'apollo-boost';

/* Expense */

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

/* Fixed Category */

export const fixedCategoryFragment = gql`
    fragment IFixedCategory on FixedCategory {
        fixedCategoryId
        timePeriodId
        userId
        amount
        name
        paid
        note
    }
`;

/* Saving */

export const savingFragment = gql`
    fragment ISaving on Saving {
        savingId
        userId
        savingCategoryId
        amount
        date
        name    
    }
`;

/* Saving Category */

export const savingCategoryFragment = gql`
    ${savingFragment}
    
    fragment ISavingCategory on SavingCategory {
        savingCategoryId
        userId
        name
        savings {
            ...ISaving
        }   
    }
`;

export const createSavingCategoryFragment = gql`
    fragment ICreateSavingCategory on SavingCategory {
        savingCategoryId
        userId
        name
    }
`;

/* Variable Category */

export const variableCategoryFragment = gql`
    ${expenseFragment}
    
    fragment IVariableCategory on VariableCategory {
        variableCategoryId
        timePeriodId
        userId
        amount
        name
        expenses {
            ...IExpense
        }   
    }
`;

export const createVariableCategoryFragment = gql`
    fragment ICreateVariableCategory on VariableCategory {
        variableCategoryId
        timePeriodId
        userId
        amount
        name
    }
`;

/* Time Period */

export const timePeriodFragment = gql`
    fragment ITimePeriod on TimePeriod {
        timePeriodId
        beginDate
        endDate
        userId
    }
`;
