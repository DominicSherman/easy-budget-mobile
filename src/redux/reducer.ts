import {User} from '@react-native-community/google-signin';

import {AppStatus} from '../enums/AppStatus';
import {Mode} from '../enums/Mode';
import {ITimePeriod} from '../../autogen/ITimePeriod';

import {Actions} from './actions';

export enum TimePeriodType {
    ACTIVE = 'ACTIVE',
    PREVIOUS = 'PREVIOUS',
    UPCOMING = 'UPCOMING"'
}

const defaultState: IAppState = {
    appStatus: null,
    mode: Mode.DARK,
    timePeriod: null,
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
    [Actions.SET_TIME_PERIOD]: setKey('timePeriod'),
    [Actions.SET_USER_INFORMATION]: setKey('userInformation')
};

type ReducerMap = { [key in Actions]?: (state: IAppState, value: any) => IAppState };

export interface ITimePeriodState extends ITimePeriod {
    type: TimePeriodType
}

export interface IAppState {
    appStatus: AppStatus | null
    mode: Mode
    timePeriod: ITimePeriodState | null
    userInformation: User
}

export default (state = defaultState, {type, data}: { type: Actions, data?: any }): IAppState => {
    const action = reducerMap[type];

    if (action) {
        return action(state, data);
    }

    return state;
};
