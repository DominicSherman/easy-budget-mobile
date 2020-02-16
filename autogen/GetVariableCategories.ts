/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetVariableCategories
// ====================================================

export interface GetVariableCategories_variableCategories_expenses {
  __typename: "Expense";
  expenseId: string;
  userId: string;
  variableCategoryId: string;
  timePeriodId: string;
  amount: number;
  date: string;
  name: string | null;
}

export interface GetVariableCategories_variableCategories {
  __typename: "VariableCategory";
  variableCategoryId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  name: string;
  expenses: GetVariableCategories_variableCategories_expenses[];
}

export interface GetVariableCategories {
  variableCategories: GetVariableCategories_variableCategories[];
}

export interface GetVariableCategoriesVariables {
  userId: string;
  timePeriodId: string;
}
