/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateDebtCategory } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateDebtCategoryMutation
// ====================================================

export interface UpdateDebtCategoryMutation_updateDebtCategory {
  __typename: "DebtCategory";
  debtCategoryId: string;
  userId: string;
  name: string;
  amount: number;
}

export interface UpdateDebtCategoryMutation {
  updateDebtCategory: UpdateDebtCategoryMutation_updateDebtCategory;
}

export interface UpdateDebtCategoryMutationVariables {
  debtCategory: UpdateDebtCategory;
}
