/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFixedCategories
// ====================================================

export interface GetFixedCategories_fixedCategories {
  __typename: "FixedCategory";
  fixedCategoryId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  name: string;
  paid: boolean;
  note: string | null;
}

export interface GetFixedCategories {
  fixedCategories: GetFixedCategories_fixedCategories[];
}

export interface GetFixedCategoriesVariables {
  userId: string;
  timePeriodId: string;
}
