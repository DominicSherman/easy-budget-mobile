/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateFixedCategory } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateFixedCategoryMutation
// ====================================================

export interface CreateFixedCategoryMutation_createFixedCategory {
  __typename: "FixedCategory";
  fixedCategoryId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  name: string;
  paid: boolean;
  note: string | null;
}

export interface CreateFixedCategoryMutation {
  createFixedCategory: CreateFixedCategoryMutation_createFixedCategory;
}

export interface CreateFixedCategoryMutationVariables {
  fixedCategory: CreateFixedCategory;
}
