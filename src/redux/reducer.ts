import {User} from '@react-native-community/google-signin';

import {AppStatus} from '../enums/AppStatus';
import {Mode} from '../enums/Mode';

import {Actions} from './actions';

const defaultState: IAppState = {
    appStatus: null,
    mode: Mode.DARK,
    timePeriodId: '',
    userInformation: {
        idToken: '',
        serverAuthCode: null,
        user: {
            email: '',
            familyName: null,
            givenName: null,
            id: '',
            name: null,
            photo: null
        }
    }
};

const setKey = (key: string): (state: IAppState, value: any) => IAppState => (state, value): IAppState => ({
    ...state,
    [key]: value
});

const resetState = (state: IAppState): IAppState => ({
    ...defaultState,
    mode: state.mode
});

const reducerMap: ReducerMap = {
    [Actions.RESET_STATE]: resetState,
    [Actions.SET_APP_STATUS]: setKey('appStatus'),
    [Actions.SET_MODE]: setKey('mode'),
    [Actions.SET_TIME_PERIOD_ID]: setKey('timePeriodId'),
    [Actions.SET_USER_INFORMATION]: setKey('userInformation')
};

type ReducerMap = { [key in Actions]?: (state: IAppState, value: any) => IAppState };

export interface IAppState {
    appStatus: AppStatus | null
    mode: Mode
    timePeriodId: string
    userInformation: User
}

export default (state = defaultState, {type, data}: { type: Actions, data?: any }): IAppState => {
    const action = reducerMap[type];

    if (action) {
        return action(state, data);
    }

    return state;
};
