/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSavingCategories
// ====================================================

export interface GetSavingCategories_savingCategories {
  __typename: "SavingCategory";
  savingCategoryId: string;
  userId: string;
  name: string;
  amount: number;
}

export interface GetSavingCategories {
  savingCategories: GetSavingCategories_savingCategories[];
}

export interface GetSavingCategoriesVariables {
  userId: string;
}
