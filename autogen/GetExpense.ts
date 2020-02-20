/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetExpense
// ====================================================

export interface GetExpense_expense {
  __typename: "Expense";
  expenseId: string;
  userId: string;
  variableCategoryId: string;
  timePeriodId: string;
  amount: number;
  date: string;
  name: string | null;
}

export interface GetExpense {
  expense: GetExpense_expense;
}

export interface GetExpenseVariables {
  userId: string;
  expenseId: string;
}
