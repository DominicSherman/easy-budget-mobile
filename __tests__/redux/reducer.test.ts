import {createRandomAppState} from '../models';
import reducer, {IAppState} from '../../src/redux/reducer';
import {chance} from '../chance';
import {Actions} from '../../src/redux/actions';
import {AppStatus} from '../../src/enums/app-status';

const defaultState: IAppState = {
    appStatus: AppStatus.LOADING,
    timePeriodId: null
};

describe('reducer', () => {
    let expectedAppState: IAppState;

    beforeEach(() => {
        expectedAppState = createRandomAppState();
    });

    it('should return the default state if state is null and action fails to match', () => {
        const actualState = reducer(undefined, {
            data: chance.string(),
            // @ts-ignore
            type: chance.string()
        });

        expect(actualState).toEqual(defaultState);
    });

    it('should set the appStatus if the action is SET_APP_STATUS', () => {
        const appStatus = chance.string();

        const actualState = reducer(expectedAppState, {
            data: appStatus,
            type: Actions.SET_APP_STATUS
        });

        expect(actualState).toEqual({
            ...expectedAppState,
            appStatus
        });
    });

    it('should set the timePeriodId if the action is SET_TIME_PERIOD_ID', () => {
        const timePeriodId = chance.guid();

        const actualState = reducer(expectedAppState, {
            data: timePeriodId,
            type: Actions.SET_TIME_PERIOD_ID
        });

        expect(actualState).toEqual({
            ...expectedAppState,
            timePeriodId
        });
    });
});
