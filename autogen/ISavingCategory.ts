/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ISavingCategory
// ====================================================

export interface ISavingCategory_savings {
  __typename: "Saving";
  savingId: string;
  userId: string;
  savingCategoryId: string;
  amount: number;
  date: string;
  name: string | null;
}

export interface ISavingCategory {
  __typename: "SavingCategory";
  savingCategoryId: string;
  userId: string;
  name: string;
  savings: ISavingCategory_savings[];
}
