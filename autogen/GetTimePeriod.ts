/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTimePeriod
// ====================================================

export interface GetTimePeriod_timePeriod {
  __typename: "TimePeriod";
  timePeriodId: string;
  beginDate: string;
  endDate: string;
  userId: string;
}

export interface GetTimePeriod {
  timePeriod: GetTimePeriod_timePeriod;
}

export interface GetTimePeriodVariables {
  userId: string;
  timePeriodId: string;
}
