/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateSavingCategory } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSavingCategoryMutation
// ====================================================

export interface UpdateSavingCategoryMutation_updateSavingCategory {
  __typename: "SavingCategory";
  savingCategoryId: string;
  userId: string;
  name: string;
}

export interface UpdateSavingCategoryMutation {
  updateSavingCategory: UpdateSavingCategoryMutation_updateSavingCategory;
}

export interface UpdateSavingCategoryMutationVariables {
  savingCategory: UpdateSavingCategory;
}
