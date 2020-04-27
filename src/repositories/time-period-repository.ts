import {GetActiveTimePeriod, GetActiveTimePeriodVariables} from '../../autogen/GetActiveTimePeriod';
import {getActiveTimePeriodQuery, getTimePeriodsQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getRoundedDate} from '../services/moment-service';
import {GetTimePeriods, GetTimePeriodsVariables} from '../../autogen/GetTimePeriods';

import {queryGraphql, QueryResponse} from './query-middleware';

export const getActiveTimePeriod = (): Promise<QueryResponse<GetActiveTimePeriod>> => {
    const date = getRoundedDate();

    return queryGraphql<GetActiveTimePeriod, GetActiveTimePeriodVariables>({
        fetchPolicy: 'network-only',
        query: getActiveTimePeriodQuery,
        variables: {
            date,
            userId: getUserId()
        }
    });
};

export const getTimePeriods = (): Promise<QueryResponse<GetTimePeriods>> =>
    queryGraphql<GetTimePeriods, GetTimePeriodsVariables>({
        query: getTimePeriodsQuery,
        variables: {
            userId: getUserId()
        }
    });
