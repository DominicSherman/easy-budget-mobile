/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateExpense } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateExpenseMutation
// ====================================================

export interface UpdateExpenseMutation_updateExpense {
  __typename: "Expense";
  expenseId: string;
  userId: string;
  variableCategoryId: string;
  timePeriodId: string;
  amount: number;
  date: string;
  name: string | null;
}

export interface UpdateExpenseMutation {
  updateExpense: UpdateExpenseMutation_updateExpense;
}

export interface UpdateExpenseMutationVariables {
  expense: UpdateExpense;
}
