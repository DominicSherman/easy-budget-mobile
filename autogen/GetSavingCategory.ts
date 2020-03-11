/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSavingCategory
// ====================================================

export interface GetSavingCategory_savingCategory_savings {
  __typename: "Saving";
  savingId: string;
  userId: string;
  savingCategoryId: string;
  amount: number;
  date: string;
  name: string | null;
}

export interface GetSavingCategory_savingCategory {
  __typename: "SavingCategory";
  savingCategoryId: string;
  userId: string;
  name: string;
  savings: GetSavingCategory_savingCategory_savings[];
}

export interface GetSavingCategory {
  savingCategory: GetSavingCategory_savingCategory;
}

export interface GetSavingCategoryVariables {
  userId: string;
  savingCategoryId: string;
}
