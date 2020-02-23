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
  note?: string | null;
}

export interface CreateTimePeriod {
  timePeriodId: string;
  beginDate: string;
  endDate: string;
  userId: string;
}

export interface CreateVariableCategory {
  variableCategoryId: string;
  timePeriodId: string;
  userId: string;
  amount: number;
  name: string;
}

export interface UpdateExpense {
  expenseId: string;
  userId: string;
  amount?: number | null;
  date?: string | null;
  name?: string | null;
  variableCategoryId?: string | null;
}

export interface UpdateFixedCategory {
  fixedCategoryId: string;
  userId: string;
  amount?: number | null;
  name?: string | null;
  paid?: boolean | null;
  note?: string | null;
}

export interface UpdateVariableCategory {
  variableCategoryId: string;
  userId: string;
  amount?: number | null;
  name?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
