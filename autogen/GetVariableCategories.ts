/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetVariableCategories
// ====================================================

export interface GetVariableCategories_variableCategories {
  __typename: "VariableCategory";
  variableCategoryId: string;
  userId: string;
  amount: number;
  name: string;
}

export interface GetVariableCategories {
  variableCategories: GetVariableCategories_variableCategories[];
}

export interface GetVariableCategoriesVariables {
  userId: string;
}
