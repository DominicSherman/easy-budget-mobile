import TestRenderer from 'react-test-renderer';
import React from 'react';
import Touchable from 'react-native-platform-touchable';
import * as reactHooks from '@apollo/react-hooks';

import Home from '../../src/screens/Home';
import {getUserId, signOut} from '../../src/services/auth-service';
import {createRandomQueryResult, createRandomTimePeriods} from '../models';
import {getActiveTimePeriodQuery} from '../../src/graphql/queries';
import {getRoundedDate} from '../../src/services/moment-service';
import {getEarlyReturn} from '../../src/services/error-and-loading-service';

jest.mock('@apollo/react-hooks');
jest.mock('../../src/services/auth-service');

describe('Home', () => {
    const {useQuery} = reactHooks as jest.Mocked<typeof reactHooks>;

    let root,
        expectedData;

    const render = (): void => {
        root = TestRenderer.create(<Home />).root;
    };

    beforeEach(() => {
        expectedData = createRandomQueryResult({
            timePeriods: createRandomTimePeriods()
        });

        useQuery.mockReturnValue(expectedData);

        render();
    });

    it('should query for the active time period data', () => {
        expect(useQuery).toHaveBeenCalledTimes(1);
        expect(useQuery).toHaveBeenCalledWith(getActiveTimePeriodQuery, {
            variables: {
                date: getRoundedDate(),
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

        const earlyReturn = getEarlyReturn(expectedData);

        root.findByType(earlyReturn.type);
    });

    it('should render a Touchable to log out', () => {
        const renderedTouchable = root.findByType(Touchable);

        expect(renderedTouchable.props.onPress).toBe(signOut);
    });
});
