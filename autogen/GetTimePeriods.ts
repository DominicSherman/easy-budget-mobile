/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTimePeriods
// ====================================================

export interface GetTimePeriods_timePeriods {
  __typename: "TimePeriod";
  timePeriodId: string;
  beginDate: string;
  endDate: string;
  userId: string;
}

export interface GetTimePeriods {
  timePeriods: GetTimePeriods_timePeriods[];
}

export interface GetTimePeriodsVariables {
  userId: string;
}
