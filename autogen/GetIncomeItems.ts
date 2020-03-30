/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetIncomeItems
// ====================================================

export interface GetIncomeItems_incomeItems {
  __typename: "IncomeItem";
  incomeItemId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  recurring: boolean;
  name: string | null;
}

export interface GetIncomeItems {
  incomeItems: GetIncomeItems_incomeItems[];
}

export interface GetIncomeItemsVariables {
  userId: string;
  timePeriodId: string;
}
