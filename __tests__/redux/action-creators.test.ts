import moment from 'moment';

import {onUpdateOrCreateTimePeriod, setAppState} from '../../src/redux/action-creators';
import * as timePeriodRepository from '../../src/repositories/time-period-repository';
import {
    createRandomErrorResponse,
    createRandomOkResponse, createRandomTimePeriod,
    createRandomTimePeriods,
    createRandomUserInformation
} from '../models';
import {dispatchAction} from '../../src/redux/store';
import {Actions} from '../../src/redux/actions';
import {ITimePeriod} from '../../autogen/ITimePeriod';
import * as authService from '../../src/services/auth-service';
import {AppStatus} from '../../src/enums/AppStatus';

jest.mock('../../src/repositories/time-period-repository');
jest.mock('../../src/redux/store');
jest.mock('../../src/services/auth-service');

describe('action creators', () => {
    const {getActiveTimePeriod, getTimePeriods} = timePeriodRepository as jest.Mocked<typeof timePeriodRepository>;
    const {getIsSignedIn, signInSilently} = authService as jest.Mocked<typeof authService>;

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

        it('should set the app status to loading', async () => {
            await setAppState();

            expect(dispatchAction).toHaveBeenCalledWith(Actions.SET_APP_STATUS, AppStatus.LOADING);
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

                    expect(dispatchAction).toHaveBeenCalledWith(Actions.SET_TIME_PERIOD_ID, expectedTimePeriods[0].timePeriodId);
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

    describe('onUpdateOrCreateTimePeriod', () => {
        let expectedResult,
            expectedActiveTimePeriod;

        beforeEach(() => {
            expectedActiveTimePeriod = createRandomTimePeriod({
                beginDate: moment().subtract(1, 'd').toISOString(),
                endDate: moment().add(1, 'd').toISOString()
            });
            expectedResult = {
                data: {
                    timePeriods: [
                        expectedActiveTimePeriod,
                        createRandomTimePeriod({
                            beginDate: moment().add(2, 'd').toISOString(),
                            endDate: moment().add(30, 'd').toISOString()
                        }),
                        createRandomTimePeriod({
                            beginDate: moment().subtract(30, 'd').toISOString(),
                            endDate: moment().subtract(2, 'd').toISOString()
                        })
                    ]
                },
                hasError: false
            };

            getTimePeriods.mockResolvedValue(expectedResult);
        });

        it('should set the active time period if there is one', async () => {
            await onUpdateOrCreateTimePeriod();

            expect(dispatchAction).toHaveBeenCalledTimes(1);
            expect(dispatchAction).toHaveBeenCalledWith(Actions.SET_TIME_PERIOD_ID, expectedActiveTimePeriod.timePeriodId);
        });

        it('should set the active time period to an empty string if there is not one', async () => {
            expectedResult.data.timePeriods = expectedResult.data.timePeriods.filter((t) => t.timePeriodId !== expectedActiveTimePeriod.timePeriodId);
            getTimePeriods.mockResolvedValue(expectedResult);

            await onUpdateOrCreateTimePeriod();

            expect(dispatchAction).toHaveBeenCalledTimes(1);
            expect(dispatchAction).toHaveBeenCalledWith(Actions.SET_TIME_PERIOD_ID, '');
        });

        it('should not dispatch an action if there is an error', async () => {
            expectedResult.hasError = true;
            getTimePeriods.mockResolvedValue(expectedResult);

            await onUpdateOrCreateTimePeriod();

            expect(dispatchAction).not.toHaveBeenCalled();
        });
    });
});
