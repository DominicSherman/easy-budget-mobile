/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSavingCategories
// ====================================================

export interface GetSavingCategories_savingCategories_savings {
  __typename: "Saving";
  savingId: string;
  userId: string;
  savingCategoryId: string;
  amount: number;
  date: string;
  name: string | null;
}

export interface GetSavingCategories_savingCategories {
  __typename: "SavingCategory";
  savingCategoryId: string;
  userId: string;
  name: string;
  savings: GetSavingCategories_savingCategories_savings[];
}

export interface GetSavingCategories {
  savingCategories: GetSavingCategories_savingCategories[];
}

export interface GetSavingCategoriesVariables {
  userId: string;
}
