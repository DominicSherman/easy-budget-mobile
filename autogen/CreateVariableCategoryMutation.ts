/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateVariableCategory } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateVariableCategoryMutation
// ====================================================

export interface CreateVariableCategoryMutation_createVariableCategory {
  __typename: "VariableCategory";
  variableCategoryId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  name: string;
}

export interface CreateVariableCategoryMutation {
  createVariableCategory: CreateVariableCategoryMutation_createVariableCategory;
}

export interface CreateVariableCategoryMutationVariables {
  variableCategory: CreateVariableCategory;
}
