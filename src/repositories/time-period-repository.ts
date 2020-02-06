import {GetActiveTimePeriod, GetActiveTimePeriodVariables} from '../../autogen/GetActiveTimePeriod';
import {getActiveTimePeriodQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getRoundedDate} from '../services/moment-service';

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
