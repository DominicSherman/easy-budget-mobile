import {getActiveTimePeriod} from '../services/graphql-service';

import {dispatchAction} from './store';
import {Actions} from './actions';

export const setActiveTimePeriodData = async (): Promise<void> => {
    try {
        const result = await getActiveTimePeriod();
        const timePeriod = result.data.timePeriods[0];

        dispatchAction(Actions.SET_TIME_PERIOD_ID, timePeriod.timePeriodId);
    } catch (error) {
        dispatchAction(Actions.SET_TIME_PERIOD_ID, null);
    }
};
