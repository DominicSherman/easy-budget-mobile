/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateTimePeriod } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateTimePeriodMutation
// ====================================================

export interface CreateTimePeriodMutation_createTimePeriod {
  __typename: "TimePeriod";
  timePeriodId: string;
  beginDate: string;
  endDate: string;
  userId: string;
}

export interface CreateTimePeriodMutation {
  createTimePeriod: CreateTimePeriodMutation_createTimePeriod;
}

export interface CreateTimePeriodMutationVariables {
  timePeriod: CreateTimePeriod;
}
