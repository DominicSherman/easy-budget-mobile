/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetVariableCategory
// ====================================================

export interface GetVariableCategory_variableCategory_expenses {
  __typename: "Expense";
  expenseId: string;
  userId: string;
  variableCategoryId: string;
  timePeriodId: string;
  amount: number;
  date: string;
  name: string | null;
}

export interface GetVariableCategory_variableCategory {
  __typename: "VariableCategory";
  variableCategoryId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  name: string;
  expenses: GetVariableCategory_variableCategory_expenses[];
}

export interface GetVariableCategory {
  variableCategory: GetVariableCategory_variableCategory;
}

export interface GetVariableCategoryVariables {
  userId: string;
  variableCategoryId: string;
}
