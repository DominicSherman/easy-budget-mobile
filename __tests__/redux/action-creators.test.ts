import {setAppState} from '../../src/redux/action-creators';
import * as timePeriodRepository from '../../src/repositories/time-period-repository';
import {
    createRandomErrorResponse,
    createRandomOkResponse,
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
    const {getActiveTimePeriod} = timePeriodRepository as jest.Mocked<typeof timePeriodRepository>;
    const {getIsSignedIn, signInSilently} = authService as jest.Mocked<typeof authService>;

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

        afterEach(() => {
            jest.resetAllMocks();
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
});
