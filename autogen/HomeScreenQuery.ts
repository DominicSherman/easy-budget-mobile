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

export interface HomeScreenQuery_variableCategories_expenses {
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
  expenses: HomeScreenQuery_variableCategories_expenses[];
}

export interface HomeScreenQuery_fixedCategories {
  __typename: "FixedCategory";
  fixedCategoryId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  name: string;
  paid: boolean;
  note: string | null;
}

export interface HomeScreenQuery_savingCategories {
  __typename: "SavingCategory";
  savingCategoryId: string;
  userId: string;
  name: string;
  amount: number;
}

export interface HomeScreenQuery_incomeItems {
  __typename: "IncomeItem";
  incomeItemId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  recurring: boolean;
  name: string;
}

export interface HomeScreenQuery {
  timePeriods: HomeScreenQuery_timePeriods[];
  expenses: HomeScreenQuery_expenses[];
  variableCategories: HomeScreenQuery_variableCategories[];
  fixedCategories: HomeScreenQuery_fixedCategories[];
  savingCategories: HomeScreenQuery_savingCategories[];
  incomeItems: HomeScreenQuery_incomeItems[];
}

export interface HomeScreenQueryVariables {
  userId: string;
  date: string;
  timePeriodId: string;
}
