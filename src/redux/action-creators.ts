import {User} from '@react-native-community/google-signin';

import {getActiveTimePeriod, getTimePeriods} from '../repositories/time-period-repository';
import {getIsSignedIn, signInSilently} from '../services/auth-service';
import {AppStatus} from '../enums/AppStatus';
import {QueryResponse} from '../repositories/query-middleware';
import {GetActiveTimePeriod} from '../../autogen/GetActiveTimePeriod';
import {isActiveTimePeriod, isFutureTimePeriod, isPreviousTimePeriod} from '../utils/utils';
import {ITimePeriod} from '../../autogen/ITimePeriod';

import {dispatchAction} from './store';
import {Actions} from './actions';
import {TimePeriodType} from './reducer';

export const setAppState = async (): Promise<void> => {
    const isSignedIn = await getIsSignedIn();

    if (isSignedIn) {
        const [user, result] = await Promise.all<User | null, QueryResponse<GetActiveTimePeriod>>([
            signInSilently(),
            getActiveTimePeriod()
        ]);

        dispatchAction(Actions.SET_USER_INFORMATION, user);

        if (!result.hasError) {
            const timePeriod = result.data.timePeriods[0];

            if (timePeriod) {
                dispatchAction(Actions.SET_TIME_PERIOD, {
                    ...timePeriod,
                    type: TimePeriodType.ACTIVE
                });
            }

            dispatchAction(Actions.SET_APP_STATUS, AppStatus.LOGGED_IN);
        } else {
            dispatchAction(Actions.SET_APP_STATUS, AppStatus.ERROR);
        }
    } else {
        dispatchAction(Actions.RESET_STATE);
        dispatchAction(Actions.SET_APP_STATUS, AppStatus.LOGGED_OUT);
    }
};

export const onUpdateOrCreateTimePeriod = async (): Promise<void> => {
    const result = await getTimePeriods();

    if (!result.hasError) {
        const activeTimePeriod = result.data.timePeriods.find(isActiveTimePeriod);

        if (activeTimePeriod) {
            dispatchAction(Actions.SET_TIME_PERIOD, activeTimePeriod.timePeriodId);
        } else {
            dispatchAction(Actions.SET_TIME_PERIOD, '');
        }
    }
};

export const browseTimePeriod = (timePeriod: ITimePeriod): void => {
    let type = TimePeriodType.ACTIVE;

    if (isPreviousTimePeriod(timePeriod)) {
        type = TimePeriodType.PREVIOUS;
    } else if (isFutureTimePeriod(timePeriod)) {
        type = TimePeriodType.UPCOMING;
    }

    dispatchAction(Actions.SET_TIME_PERIOD, {
        ...timePeriod,
        type
    });
};
