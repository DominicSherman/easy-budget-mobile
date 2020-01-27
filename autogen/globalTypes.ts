/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateExpense {
  expenseId: string;
  userId: string;
  variableCategoryId: string;
  timePeriodId: string;
  amount: number;
  date: string;
  name?: string | null;
}

export interface CreateFixedCategory {
  fixedCategoryId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  name: string;
  paid: boolean;
}

export interface CreateVariableCategory {
  variableCategoryId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  name: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
