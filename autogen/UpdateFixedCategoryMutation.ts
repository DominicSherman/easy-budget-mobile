/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateFixedCategory } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateFixedCategoryMutation
// ====================================================

export interface UpdateFixedCategoryMutation_updateFixedCategory {
  __typename: "FixedCategory";
  fixedCategoryId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  name: string;
  paid: boolean;
  note: string | null;
}

export interface UpdateFixedCategoryMutation {
  updateFixedCategory: UpdateFixedCategoryMutation_updateFixedCategory;
}

export interface UpdateFixedCategoryMutationVariables {
  fixedCategory: UpdateFixedCategory;
}
