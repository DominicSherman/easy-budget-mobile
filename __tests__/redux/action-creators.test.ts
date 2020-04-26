import moment from 'moment';

import {onCreateTimePeriod, onUpdateTimePeriod, setAppState, setTimePeriod} from '../../src/redux/action-creators';
import * as timePeriodRepository from '../../src/repositories/time-period-repository';
import {
    createRandomAppState,
    createRandomErrorResponse,
    createRandomOkResponse,
    createRandomTimePeriod,
    createRandomTimePeriods,
    createRandomUserInformation
} from '../models';
import {Actions} from '../../src/redux/actions';
import {ITimePeriod} from '../../autogen/ITimePeriod';
import * as authService from '../../src/services/auth-service';
import {AppStatus} from '../../src/enums/AppStatus';
import {TimePeriodType} from '../../src/redux/reducer';
import * as reduxStore from '../../src/redux/store';

jest.mock('../../src/repositories/time-period-repository');
jest.mock('../../src/redux/store');
jest.mock('../../src/services/auth-service');

describe('action creators', () => {
    const {getActiveTimePeriod} = timePeriodRepository as jest.Mocked<typeof timePeriodRepository>;
    const {getIsSignedIn, signInSilently} = authService as jest.Mocked<typeof authService>;
    const {dispatchAction, getState} = reduxStore as jest.Mocked<typeof reduxStore>;

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('setAppState', () => {
        let AsyncStorage,
            expectedTimePeriods: ITimePeriod[],
            expectedUser;

        beforeEach(() => {
            expectedUser = createRandomUserInformation();
            expectedTimePeriods = createRandomTimePeriods();
            AsyncStorage = require('react-native').AsyncStorage;
            AsyncStorage.getItem = jest.fn();

            signInSilently.mockResolvedValue(expectedUser);
            getActiveTimePeriod.mockResolvedValue(createRandomOkResponse({
                timePeriods: []
            }));
        });

        describe('when the user is signed in', () => {
            beforeEach(() => {
                getIsSignedIn.mockResolvedValue(true);
            });

            it('should call getActiveTimePeriod', async () => {
                await setAppState();

                expect(getActiveTimePeriod).toHaveBeenCalledTimes(1);
                expect(getActiveTimePeriod).toHaveBeenCalledWith();
            });

            describe('if there is not an error', () => {
                it('should set timePeriodId if there is one', async () => {
                    getActiveTimePeriod.mockResolvedValue(createRandomOkResponse({
                        timePeriods: expectedTimePeriods
                    }));

                    await setAppState();

                    expect(dispatchAction).toHaveBeenCalledWith(Actions.SET_TIME_PERIOD, {
                        ...expectedTimePeriods[0],
                        type: TimePeriodType.ACTIVE
                    });
                });

                it('should set the user', async () => {
                    await setAppState();

                    expect(dispatchAction).toHaveBeenCalledWith(Actions.SET_USER_INFORMATION, expectedUser);
                });

                it('should set the app status to logged in', async () => {
                    await setAppState();

                    expect(dispatchAction).toHaveBeenCalledWith(Actions.SET_APP_STATUS, AppStatus.LOGGED_IN);
                });
            });

            it('should set app status to error if there is an error', async () => {
                getActiveTimePeriod.mockResolvedValue(createRandomErrorResponse());

                await setAppState();

                expect(dispatchAction).toHaveBeenCalledWith(Actions.SET_APP_STATUS, AppStatus.ERROR);
            });
        });

        it('should set the app status to logged out if the user is not logged in', async () => {
            await setAppState();

            expect(dispatchAction).toHaveBeenCalledWith(Actions.SET_APP_STATUS, AppStatus.LOGGED_OUT);
        });
    });

    describe('setTimePeriod', () => {
        it('should set the time period in state if it is active', () => {
            const timePeriod = createRandomTimePeriod({
                beginDate: moment().subtract(5, 'm').toISOString(),
                endDate: moment().add(5, 'm').toISOString()
            });

            setTimePeriod(timePeriod);

            expect(dispatchAction).toHaveBeenCalledTimes(1);
            expect(dispatchAction).toHaveBeenCalledWith(Actions.SET_TIME_PERIOD, {
                ...timePeriod,
                type: TimePeriodType.ACTIVE
            });
        });

        it('should set the time period in state if it is previous', () => {
            const timePeriod = createRandomTimePeriod({
                beginDate: moment().subtract(10, 'm').toISOString(),
                endDate: moment().subtract(5, 'm').toISOString()
            });

            setTimePeriod(timePeriod);

            expect(dispatchAction).toHaveBeenCalledTimes(1);
            expect(dispatchAction).toHaveBeenCalledWith(Actions.SET_TIME_PERIOD, {
                ...timePeriod,
                type: TimePeriodType.PREVIOUS
            });
        });

        it('should set the time period in state if it is upcoming', () => {
            const timePeriod = createRandomTimePeriod({
                beginDate: moment().add(5, 'm').toISOString(),
                endDate: moment().add(10, 'm').toISOString()
            });

            setTimePeriod(timePeriod);

            expect(dispatchAction).toHaveBeenCalledTimes(1);
            expect(dispatchAction).toHaveBeenCalledWith(Actions.SET_TIME_PERIOD, {
                ...timePeriod,
                type: TimePeriodType.UPCOMING
            });
        });
    });

    describe('onCreateTimePeriod', () => {
        let expectedState;

        beforeEach(() => {
            expectedState = createRandomAppState({timePeriod: null});

            getState.mockReturnValue(expectedState);
        });

        it('should call setTimePeriod if there is not a time period in state and the created one is active', () => {
            const timePeriod = createRandomTimePeriod({
                beginDate: moment().subtract(5, 's').toISOString(),
                endDate: moment().add(5, 's').toISOString()
            });

            onCreateTimePeriod(timePeriod);

            expect(dispatchAction).toHaveBeenCalledTimes(1);
            expect(dispatchAction).toHaveBeenCalledWith(Actions.SET_TIME_PERIOD, {
                ...timePeriod,
                type: TimePeriodType.ACTIVE
            });
        });

        it('should call **not** call setTimePeriod if time period is not active', () => {
            const timePeriod = createRandomTimePeriod({
                beginDate: moment().subtract(10, 's'),
                endDate: moment().subtract(9, 's')
            });

            onCreateTimePeriod(timePeriod);

            expect(dispatchAction).not.toHaveBeenCalled();
        });

        it('should call **not** call setTimePeriod if there is a time period in state', () => {
            const timePeriod = createRandomTimePeriod({
                beginDate: moment().subtract(5, 's').toISOString(),
                endDate: moment().add(5, 's').toISOString()
            });

            expectedState = createRandomAppState();
            getState.mockReturnValue(expectedState);

            onCreateTimePeriod(timePeriod);

            expect(dispatchAction).not.toHaveBeenCalled();
        });
    });

    describe('onUpdateTimePeriod', () => {
        let expectedState;

        it('should call setTimePeriod if the current time period in state is the created one', () => {
            const timePeriod = createRandomTimePeriod({
                beginDate: moment().subtract(5, 's').toISOString(),
                endDate: moment().add(5, 's').toISOString()
            });

            expectedState = createRandomAppState({
                timePeriod: {
                    timePeriodId: timePeriod.timePeriodId
                }
            });
            getState.mockReturnValue(expectedState);

            onUpdateTimePeriod(timePeriod);

            expect(dispatchAction).toHaveBeenCalledTimes(1);
            expect(dispatchAction).toHaveBeenCalledWith(Actions.SET_TIME_PERIOD, {
                ...timePeriod,
                type: TimePeriodType.ACTIVE
            });
        });

        it('should call **not** call setTimePeriod if there is not a time period in state', () => {
            const timePeriod = createRandomTimePeriod({
                beginDate: moment().subtract(10, 's'),
                endDate: moment().subtract(9, 's')
            });

            expectedState = createRandomAppState({
                timePeriod: null
            });
            getState.mockReturnValue(expectedState);

            onUpdateTimePeriod(timePeriod);

            expect(dispatchAction).not.toHaveBeenCalled();
        });

        it('should call **not** call setTimePeriod if the time period in state does not match', () => {
            const timePeriod = createRandomTimePeriod({
                beginDate: moment().subtract(10, 's'),
                endDate: moment().subtract(9, 's')
            });

            expectedState = createRandomAppState();
            getState.mockReturnValue(expectedState);

            onUpdateTimePeriod(timePeriod);

            expect(dispatchAction).not.toHaveBeenCalled();
        });
    });
});
