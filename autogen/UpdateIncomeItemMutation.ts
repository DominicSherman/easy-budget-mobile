/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateIncomeItem } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateIncomeItemMutation
// ====================================================

export interface UpdateIncomeItemMutation_updateIncomeItem {
  __typename: "IncomeItem";
  incomeItemId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  recurring: boolean;
  name: string | null;
}

export interface UpdateIncomeItemMutation {
  updateIncomeItem: UpdateIncomeItemMutation_updateIncomeItem;
}

export interface UpdateIncomeItemMutationVariables {
  incomeItem: UpdateIncomeItem;
}
