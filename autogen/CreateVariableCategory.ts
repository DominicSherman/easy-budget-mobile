/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateVariableCategory } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateVariableCategory
// ====================================================

export interface CreateVariableCategory_createVariableCategory {
  __typename: "VariableCategory";
  variableCategoryId: string;
  userId: string;
  amount: number;
  name: string;
}

export interface CreateVariableCategory {
  createVariableCategory: CreateVariableCategory_createVariableCategory;
}

export interface CreateVariableCategoryVariables {
  variableCategory: CreateVariableCategory;
}
