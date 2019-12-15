import moment from 'moment';

import {getApolloClient} from '../graphql/apollo-client';
import {getActiveTimePeriod} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {GetActiveTimePeriod, GetActiveTimePeriodVariables} from '../../autogen/GetActiveTimePeriod';

import {dispatchAction} from './store';
import {Actions} from './actions';

export const setActiveTimePeriodData = async (): Promise<void> => {
    const date = moment().toISOString();

    try {
        const result = await getApolloClient().query<GetActiveTimePeriod, GetActiveTimePeriodVariables>({
            query: getActiveTimePeriod,
            variables: {
                date,
                userId: getUserId()
            }
        });
        console.log('result', result);
        const timePeriod = result.data.timePeriods[0];

        dispatchAction(Actions.SET_TIME_PERIOD_ID, timePeriod.timePeriodId);
    } catch (error) {
        dispatchAction(Actions.SET_TIME_PERIOD_ID, null);
    }
};
