/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateSavingCategory } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSavingCategoryMutation
// ====================================================

export interface CreateSavingCategoryMutation_createSavingCategory {
  __typename: "SavingCategory";
  savingCategoryId: string;
  userId: string;
  name: string;
}

export interface CreateSavingCategoryMutation {
  createSavingCategory: CreateSavingCategoryMutation_createSavingCategory;
}

export interface CreateSavingCategoryMutationVariables {
  savingCategory: CreateSavingCategory;
}
