import {User} from '@react-native-community/google-signin';

import {getActiveTimePeriod} from '../repositories/time-period-repository';
import {getIsSignedIn, signInSilently} from '../services/auth-service';
import {AppStatus} from '../enums/AppStatus';
import {QueryResponse} from '../repositories/query-middleware';
import {GetActiveTimePeriod} from '../../autogen/GetActiveTimePeriod';
import {isActiveTimePeriod, isFutureTimePeriod, isPreviousTimePeriod} from '../utils/utils';
import {ITimePeriod} from '../../autogen/ITimePeriod';

import {dispatchAction, getState} from './store';
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

const getTimePeriodType = (timePeriod: {beginDate: string, endDate: string}): TimePeriodType => {
    let type = TimePeriodType.ACTIVE;

    if (isPreviousTimePeriod(timePeriod)) {
        type = TimePeriodType.PREVIOUS;
    } else if (isFutureTimePeriod(timePeriod)) {
        type = TimePeriodType.UPCOMING;
    }

    return type;
};

export const setTimePeriod = (timePeriod: ITimePeriod): void => {
    dispatchAction(Actions.SET_TIME_PERIOD, {
        ...timePeriod,
        type: getTimePeriodType(timePeriod)
    });
};

export const onCreateTimePeriod = (timePeriod: ITimePeriod): void => {
    const currentTimePeriod = getState().timePeriod;

    if (!currentTimePeriod && isActiveTimePeriod(timePeriod)) {
        setTimePeriod(timePeriod);
    }
};

export const onUpdateTimePeriod = (timePeriod: ITimePeriod): void => {
    const currentTimePeriodId = getState().timePeriod?.timePeriodId;

    if (currentTimePeriodId === timePeriod.timePeriodId) {
        setTimePeriod(timePeriod);
    }
};
