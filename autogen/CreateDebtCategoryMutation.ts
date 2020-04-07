/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateDebtCategory } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateDebtCategoryMutation
// ====================================================

export interface CreateDebtCategoryMutation_createDebtCategory {
  __typename: "DebtCategory";
  debtCategoryId: string;
  userId: string;
  name: string;
}

export interface CreateDebtCategoryMutation {
  createDebtCategory: CreateDebtCategoryMutation_createDebtCategory;
}

export interface CreateDebtCategoryMutationVariables {
  debtCategory: CreateDebtCategory;
}
