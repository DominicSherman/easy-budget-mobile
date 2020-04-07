/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDebtCategories
// ====================================================

export interface GetDebtCategories_debtCategories {
  __typename: "DebtCategory";
  debtCategoryId: string;
  userId: string;
  name: string;
  amount: number;
}

export interface GetDebtCategories {
  debtCategories: GetDebtCategories_debtCategories[];
}

export interface GetDebtCategoriesVariables {
  userId: string;
}
