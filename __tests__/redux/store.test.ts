import * as redux from 'redux';

import {dispatchAction, getState, getStore, initializeStore, resetStore} from '../../src/redux/store';
import reducer, {IAppState} from '../../src/redux/reducer';
import {createRandomAppState} from '../models';
import {Actions} from '../../src/redux/actions';
import {chance} from '../chance';

jest.mock('redux');

describe('store', () => {
    const {createStore} = redux as jest.Mocked<typeof redux>;

    let expectedState: IAppState,
        expectedStore: any;

    beforeEach(() => {
        expectedState = createRandomAppState();
        expectedStore = {
            dispatch: jest.fn(),
            getState: jest.fn(() => expectedState)
        };

        createStore.mockReturnValue(expectedStore);

        initializeStore();
    });

    afterEach(() => {
        resetStore();
    });

    describe('initializeStore', () => {
        it('should call create store with the reducer', () => {
            expect(createStore).toHaveBeenCalledTimes(1);
            expect(createStore).toHaveBeenCalledWith(reducer);
        });
    });

    describe('getStore', () => {
        it('should return the store', () => {
            const actualStore = getStore();

            expect(actualStore).toEqual(expectedStore);
        });
    });

    describe('getState', () => {
        it('should return state', () => {
            const actualState = getState();

            expect(actualState).toEqual(expectedState);
        });
    });

    describe('dispatchAction', () => {
        it('should call dispatch', () => {
            const expectedAction = Actions.SET_TIME_PERIOD_ID;
            const expectedData = chance.string();

            dispatchAction(expectedAction, expectedData);

            expect(expectedStore.dispatch).toHaveBeenCalledTimes(1);
            expect(expectedStore.dispatch).toHaveBeenCalledWith({
                data: expectedData,
                type: expectedAction
            });
        });
    });
});
