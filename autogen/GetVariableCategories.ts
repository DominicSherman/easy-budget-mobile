/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetVariableCategories
// ====================================================

export interface GetVariableCategories_timePeriods_variableCategories {
  __typename: "VariableCategory";
  variableCategoryId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  name: string;
}

export interface GetVariableCategories_timePeriods {
  __typename: "TimePeriod";
  timePeriodId: string;
  variableCategories: GetVariableCategories_timePeriods_variableCategories[];
}

export interface GetVariableCategories {
  timePeriods: GetVariableCategories_timePeriods[];
}

export interface GetVariableCategoriesVariables {
  userId: string;
  date: string;
}
