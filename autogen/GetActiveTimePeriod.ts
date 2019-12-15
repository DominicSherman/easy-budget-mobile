/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetActiveTimePeriod
// ====================================================

export interface GetActiveTimePeriod_timePeriods {
  __typename: "TimePeriod";
  timePeriodId: string;
  beginDate: string;
  endDate: string;
  userId: string;
}

export interface GetActiveTimePeriod {
  timePeriods: GetActiveTimePeriod_timePeriods[];
}

export interface GetActiveTimePeriodVariables {
  userId: string;
  date: string;
}
