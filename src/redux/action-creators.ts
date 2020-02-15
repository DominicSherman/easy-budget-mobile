import {User} from '@react-native-community/google-signin';

import {getActiveTimePeriod} from '../repositories/time-period-repository';
import {getIsSignedIn, signInSilently} from '../services/auth-service';
import {AppStatus} from '../enums/AppStatus';
import {QueryResponse} from '../repositories/query-middleware';
import {GetActiveTimePeriod} from '../../autogen/GetActiveTimePeriod';

import {dispatchAction} from './store';
import {Actions} from './actions';

export const setAppState = async (): Promise<void> => {
    dispatchAction(Actions.SET_APP_STATUS, AppStatus.LOADING);

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
                dispatchAction(Actions.SET_TIME_PERIOD_ID, timePeriod.timePeriodId);
            }

            dispatchAction(Actions.SET_APP_STATUS, AppStatus.LOGGED_IN);
        } else {
            dispatchAction(Actions.SET_APP_STATUS, AppStatus.ERROR);
        }
    } else {
        dispatchAction(Actions.SET_APP_STATUS, AppStatus.LOGGED_OUT);
    }
};
