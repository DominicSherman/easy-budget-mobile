/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetExpenses
// ====================================================

export interface GetExpenses_expenses {
  __typename: "Expense";
  expenseId: string;
  userId: string;
  variableCategoryId: string;
  timePeriodId: string;
  amount: number;
  date: string;
  name: string | null;
}

export interface GetExpenses_variableCategories_expenses {
  __typename: "Expense";
  expenseId: string;
  userId: string;
  variableCategoryId: string;
  timePeriodId: string;
  amount: number;
  date: string;
  name: string | null;
}

export interface GetExpenses_variableCategories {
  __typename: "VariableCategory";
  variableCategoryId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  name: string;
  expenses: GetExpenses_variableCategories_expenses[];
}

export interface GetExpenses {
  expenses: GetExpenses_expenses[];
  variableCategories: GetExpenses_variableCategories[];
}

export interface GetExpensesVariables {
  userId: string;
  timePeriodId: string;
}
