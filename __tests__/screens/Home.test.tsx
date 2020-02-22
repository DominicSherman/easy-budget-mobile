import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import * as reactRedux from 'react-redux';
import {MutationResult} from '@apollo/react-common';

import Home from '../../src/screens/Home';
import {getUserId} from '../../src/services/auth-service';
import {
    createRandomAppState,
    createRandomExpenses,
    createRandomFixedCategories,
    createRandomQueryResult,
    createRandomTimePeriods, createRandomUserInformation,
    createRandomVariableCategories
} from '../models';
import {homeScreenQuery} from '../../src/graphql/queries';
import {getRoundedDate} from '../../src/services/moment-service';
import {getEarlyReturn} from '../../src/services/error-and-loading-service';
import NoActiveTimePeriod from '../../src/components/time-period/NoActiveTimePeriod';
import {chance} from '../chance';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('@react-navigation/native');
jest.mock('../../src/services/auth-service');

describe('Home', () => {
    const {useQuery, useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useSelector} = reactRedux as jest.Mocked<typeof reactRedux>;

    let root,
        expectedTimePeriodId,
        expectedUserInformation,
        expectedData;

    const render = (): void => {
        root = TestRenderer.create(<Home />).root;
    };

    beforeEach(() => {
        expectedTimePeriodId = chance.guid();
        expectedUserInformation = createRandomUserInformation();
        expectedData = createRandomQueryResult({
            expenses: createRandomExpenses(),
            fixedCategories: createRandomFixedCategories(),
            timePeriods: createRandomTimePeriods(),
            variableCategories: createRandomVariableCategories()
        });

        useSelector.mockReturnValue([expectedTimePeriodId, expectedUserInformation]);
        useQuery.mockReturnValue(expectedData);
        useMutation.mockReturnValue([jest.fn(), {} as MutationResult]);

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call useSelector', () => {
        const expectedState = createRandomAppState();
        const selector = useSelector.mock.calls[0][0](expectedState);

        expect(selector).toEqual([expectedState.timePeriodId, expectedState.userInformation]);
    });

    it('should query for the active time period data', () => {
        expect(useQuery).toHaveBeenCalledWith(homeScreenQuery, {
            variables: {
                date: getRoundedDate(),
                timePeriodId: expectedTimePeriodId,
                userId: getUserId()
            }
        });
    });

    it('should return early if there is no data', () => {
        expectedData.data = undefined;

        useQuery.mockReturnValue(expectedData);

        render();

        const earlyReturn = getEarlyReturn(expectedData);

        root.findByType(earlyReturn.type);
    });

    it('should return early if there is no active timePeriod', () => {
        expectedData.data.timePeriods = [];

        useQuery.mockReturnValue(expectedData);
        render();

        root.findByType(NoActiveTimePeriod);
    });
});
