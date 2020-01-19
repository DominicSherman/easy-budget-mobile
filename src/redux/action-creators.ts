import {getActiveTimePeriod} from '../repositories/time-period-repository';

import {dispatchAction} from './store';
import {Actions} from './actions';

export const setActiveTimePeriodData = async (): Promise<void> => {
    const result = await getActiveTimePeriod();

    if (!result.hasError) {
        const timePeriod = result.data.timePeriods[0];

        if (timePeriod) {
            dispatchAction(Actions.SET_TIME_PERIOD_ID, timePeriod.timePeriodId);
        }

        return;
    }

    dispatchAction(Actions.SET_TIME_PERIOD_ID, null);
};
