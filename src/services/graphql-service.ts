import {ApolloQueryResult} from 'apollo-client';

import {getApolloClient} from '../graphql/apollo-client';
import {GetActiveTimePeriod, GetActiveTimePeriodVariables} from '../../autogen/GetActiveTimePeriod';
import {getActiveTimePeriodQuery} from '../graphql/queries';

import {getUserId} from './auth-service';
import {getRoundedDate} from './moment-service';

export const getActiveTimePeriod = (): Promise<ApolloQueryResult<GetActiveTimePeriod>> => {
    const date = getRoundedDate();

    return getApolloClient().query<GetActiveTimePeriod, GetActiveTimePeriodVariables>({
        query: getActiveTimePeriodQuery,
        variables: {
            date,
            userId: getUserId()
        }
    });
};
