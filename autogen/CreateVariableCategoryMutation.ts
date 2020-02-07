/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateVariableCategory } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateVariableCategoryMutation
// ====================================================

export interface CreateVariableCategoryMutation_createVariableCategory_expenses {
  __typename: "Expense";
  expenseId: string;
  userId: string;
  variableCategoryId: string;
  timePeriodId: string;
  amount: number;
  date: string;
  name: string | null;
}

export interface CreateVariableCategoryMutation_createVariableCategory {
  __typename: "VariableCategory";
  variableCategoryId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  name: string;
  expenses: CreateVariableCategoryMutation_createVariableCategory_expenses[];
}

export interface CreateVariableCategoryMutation {
  createVariableCategory: CreateVariableCategoryMutation_createVariableCategory;
}

export interface CreateVariableCategoryMutationVariables {
  variableCategory: CreateVariableCategory;
}
