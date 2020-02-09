/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomeScreenQuery
// ====================================================

export interface HomeScreenQuery_timePeriods {
  __typename: "TimePeriod";
  timePeriodId: string;
  beginDate: string;
  endDate: string;
  userId: string;
}

export interface HomeScreenQuery_expenses {
  __typename: "Expense";
  expenseId: string;
  userId: string;
  variableCategoryId: string;
  timePeriodId: string;
  amount: number;
  date: string;
  name: string | null;
}

export interface HomeScreenQuery_variableCategories {
  __typename: "VariableCategory";
  variableCategoryId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  name: string;
}

export interface HomeScreenQuery_fixedCategories {
  __typename: "FixedCategory";
  fixedCategoryId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  name: string;
  paid: boolean;
}

export interface HomeScreenQuery {
  timePeriods: HomeScreenQuery_timePeriods[];
  expenses: HomeScreenQuery_expenses[];
  variableCategories: HomeScreenQuery_variableCategories[];
  fixedCategories: HomeScreenQuery_fixedCategories[];
}

export interface HomeScreenQueryVariables {
  userId: string;
  date: string;
  timePeriodId: string;
}
