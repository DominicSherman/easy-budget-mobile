import {setActiveTimePeriodData} from '../../src/redux/action-creators';
import * as timePeriodRepository from '../../src/repositories/time-period-repository';
import {createRandomErrorResponse, createRandomOkResponse, createRandomTimePeriods} from '../models';
import {dispatchAction} from '../../src/redux/store';
import {Actions} from '../../src/redux/actions';
import {ITimePeriod} from '../../autogen/ITimePeriod';

jest.mock('../../src/repositories/time-period-repository');
jest.mock('../../src/redux/store');

describe('action creators', () => {
    const {getActiveTimePeriod} = timePeriodRepository as jest.Mocked<typeof timePeriodRepository>;

    describe('setActiveTimePeriodData', () => {
        let expectedTimePeriods: ITimePeriod[];

        beforeEach(() => {
            expectedTimePeriods = createRandomTimePeriods();

            getActiveTimePeriod.mockResolvedValue(createRandomOkResponse({
                timePeriods: expectedTimePeriods
            }));
        });

        afterEach(() => {
            jest.resetAllMocks();
        });

        it('should call getActiveTimePeriod', async () => {
            await setActiveTimePeriodData();

            expect(getActiveTimePeriod).toHaveBeenCalledTimes(1);
            expect(getActiveTimePeriod).toHaveBeenCalledWith();
        });

        it('should set time period to null if there is an error', async () => {
            getActiveTimePeriod.mockResolvedValue(createRandomErrorResponse());

            await setActiveTimePeriodData();

            expect(dispatchAction).toHaveBeenCalledTimes(1);
            expect(dispatchAction).toHaveBeenCalledWith(Actions.SET_TIME_PERIOD_ID, null);
        });

        it('should set timePeriodId if there is not an error', async () => {
            await setActiveTimePeriodData();

            expect(dispatchAction).toHaveBeenCalledTimes(1);
            expect(dispatchAction).toHaveBeenCalledWith(Actions.SET_TIME_PERIOD_ID, expectedTimePeriods[0].timePeriodId);
        });
    });
});
