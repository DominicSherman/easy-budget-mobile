import {getActiveTimePeriod} from '../repositories/time-period-repository';

import {dispatchAction} from './store';
import {Actions} from './actions';

export const setActiveTimePeriodData = async (): Promise<void> => {
    const result = await getActiveTimePeriod();

    if (result.hasError) {
        dispatchAction(Actions.SET_TIME_PERIOD_ID, null);
    } else {
        const timePeriod = result.data.timePeriods[0];

        dispatchAction(Actions.SET_TIME_PERIOD_ID, timePeriod.timePeriodId);
    }
};
