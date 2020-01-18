import {createRandomAppState} from '../models';
import reducer, {IAppState} from '../../src/redux/reducer';
import {chance} from '../chance';
import {Actions} from '../../src/redux/actions';

const defaultState: IAppState = {
    timePeriodId: ''
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
