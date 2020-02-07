/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetVariableCategories
// ====================================================

export interface GetVariableCategories_variableCategories {
  __typename: "VariableCategory";
  variableCategoryId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  name: string;
}

export interface GetVariableCategories_expenses {
  __typename: "Expense";
  expenseId: string;
  userId: string;
  variableCategoryId: string;
  timePeriodId: string;
  amount: number;
  date: string;
  name: string | null;
}

export interface GetVariableCategories {
  variableCategories: GetVariableCategories_variableCategories[];
  expenses: GetVariableCategories_expenses[];
}

export interface GetVariableCategoriesVariables {
  userId: string;
  timePeriodId: string;
}
