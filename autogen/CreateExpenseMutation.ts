/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateExpense } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateExpenseMutation
// ====================================================

export interface CreateExpenseMutation_createExpense {
  __typename: "Expense";
  expenseId: string;
  userId: string;
  variableCategoryId: string;
  timePeriodId: string;
  amount: number;
  date: string;
  name: string | null;
}

export interface CreateExpenseMutation {
  createExpense: CreateExpenseMutation_createExpense;
}

export interface CreateExpenseMutationVariables {
  expense: CreateExpense;
}
