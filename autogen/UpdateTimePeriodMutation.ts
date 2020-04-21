/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateTimePeriod } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateTimePeriodMutation
// ====================================================

export interface UpdateTimePeriodMutation_updateTimePeriod {
  __typename: "TimePeriod";
  timePeriodId: string;
  beginDate: string;
  endDate: string;
  userId: string;
}

export interface UpdateTimePeriodMutation {
  updateTimePeriod: UpdateTimePeriodMutation_updateTimePeriod;
}

export interface UpdateTimePeriodMutationVariables {
  timePeriod: UpdateTimePeriod;
}
