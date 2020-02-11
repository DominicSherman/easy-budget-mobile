/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateVariableCategory } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateVariableCategoryMutation
// ====================================================

export interface UpdateVariableCategoryMutation_updateVariableCategory {
  __typename: "VariableCategory";
  variableCategoryId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  name: string;
}

export interface UpdateVariableCategoryMutation {
  updateVariableCategory: UpdateVariableCategoryMutation_updateVariableCategory;
}

export interface UpdateVariableCategoryMutationVariables {
  variableCategory: UpdateVariableCategory;
}
