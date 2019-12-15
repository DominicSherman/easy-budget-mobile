import {Actions} from './actions';

const defaultState: IAppState = {
    timePeriodId: ''
};

const setKey = (key): (state: IAppState, value: any) => IAppState => (state, value): IAppState => ({
    ...state,
    [key]: value
});

const reducerMap = {
    [Actions.SET_TIME_PERIOD_ID]: setKey('timePeriodId')
};

export interface IAppState {
    timePeriodId: string
}

export default (state = defaultState, {type, data}): IAppState => {
    if (reducerMap[type]) {
        return reducerMap[type](state, data);
    }

    return state;
};
