import {createRandomAppState, createRandomUserInformation} from '../models';
import reducer, {IAppState} from '../../src/redux/reducer';
import {chance} from '../chance';
import {Actions} from '../../src/redux/actions';
import {AppStatus} from '../../src/enums/AppStatus';
import {Mode} from '../../src/enums/Mode';

const defaultState: IAppState = {
    appStatus: AppStatus.LOADING,
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

    it('should reset the state if the action is RESET_STATE', () => {
        const actualState = reducer(expectedAppState, {
            type: Actions.RESET_STATE
        });

        expect(actualState).toEqual({
            ...defaultState,
            mode: expectedAppState.mode
        });
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

    it('should set the mode if the action is SET_MODE', () => {
        const mode = chance.string();

        const actualState = reducer(expectedAppState, {
            data: mode,
            type: Actions.SET_MODE
        });

        expect(actualState).toEqual({
            ...expectedAppState,
            mode
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

    it('should set the userInformation if the action is SET_USER_INFORMATION', () => {
        const userInformation = createRandomUserInformation();

        const actualState = reducer(expectedAppState, {
            data: userInformation,
            type: Actions.SET_USER_INFORMATION
        });

        expect(actualState).toEqual({
            ...expectedAppState,
            userInformation
        });
    });
});
