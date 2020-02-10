/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFixedCategory
// ====================================================

export interface GetFixedCategory_fixedCategory {
  __typename: "FixedCategory";
  fixedCategoryId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  name: string;
  paid: boolean;
  note: string | null;
}

export interface GetFixedCategory {
  fixedCategory: GetFixedCategory_fixedCategory;
}

export interface GetFixedCategoryVariables {
  userId: string;
  fixedCategoryId: string;
}
