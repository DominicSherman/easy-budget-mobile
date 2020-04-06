/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateIncomeItem } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateIncomeItemMutation
// ====================================================

export interface CreateIncomeItemMutation_createIncomeItem {
  __typename: "IncomeItem";
  incomeItemId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  recurring: boolean;
  name: string;
}

export interface CreateIncomeItemMutation {
  createIncomeItem: CreateIncomeItemMutation_createIncomeItem;
}

export interface CreateIncomeItemMutationVariables {
  incomeItem: CreateIncomeItem;
}
