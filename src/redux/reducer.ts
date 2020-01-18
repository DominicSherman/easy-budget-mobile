import {Actions} from './actions';

const defaultState: IAppState = {
    timePeriodId: ''
};

const setKey = (key: string): (state: IAppState, value: any) => IAppState => (state, value): IAppState => ({
    ...state,
    [key]: value
});

const reducerMap: ReducerMap = {
    [Actions.SET_TIME_PERIOD_ID]: setKey('timePeriodId')
};

type ReducerMap = {[key in Actions]?: (state: IAppState, value: any) => IAppState};

export interface IAppState {
    timePeriodId: string
}

export default (state = defaultState, {type, data}: {type: Actions, data: any}): IAppState => {
    const action = reducerMap[type];

    if (action) {
        return action(state, data);
    }

    return state;
};
