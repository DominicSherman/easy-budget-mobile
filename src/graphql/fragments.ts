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

/* Saving Category */

export const savingCategoryFragment = gql`
    fragment ISavingCategory on SavingCategory {
        savingCategoryId
        userId
        name 
        amount
    }
`;

export const createSavingCategoryFragment = gql`
    fragment ICreateSavingCategory on SavingCategory {
        savingCategoryId
        userId
        name
    }
`;

/* Debt Category */

export const debtCategoryFragment = gql`
    fragment IDebtCategory on DebtCategory {
        debtCategoryId
        userId
        name 
        amount
    }
`;

export const createDebtCategoryFragment = gql`
    fragment ICreateDebtCategory on DebtCategory {
        debtCategoryId
        userId
        name
    }
`;

/* Income Item */

export const incomeItemFragment = gql`
    fragment IIncomeItem on IncomeItem {
        incomeItemId
        timePeriodId
        userId
        amount
        recurring
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
