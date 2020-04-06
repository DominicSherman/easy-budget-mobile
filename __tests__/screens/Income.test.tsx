import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {FlatList} from 'react-native';
import {MutationResult} from '@apollo/react-common';

import Income from '../../src/screens/Income';
import {createRandomIncomeItems, createRandomQueryResult} from '../models';
import {chance} from '../chance';
import {getEarlyReturn} from '../../src/services/error-and-loading-service';
import {sortByName} from '../../src/utils/sorting-utils';
import * as hooks from '../../src/utils/hooks';
import IncomeItem from '../../src/components/income/IncomeItem';
import {IIncomeItem} from '../../autogen/IIncomeItem';
import EmptyScreen from '../../src/components/generic/EmptyScreen';
import {Route} from '../../src/enums/Route';
import {InformationRef} from '../../src/screens/Information';
import NoActiveTimePeriod from '../../src/components/time-period/NoActiveTimePeriod';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('@react-navigation/native');
jest.mock('../../src/services/auth-service');
jest.mock('../../src/utils/hooks');

describe('Income', () => {
    const {useQuery, useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useBudgetNavigation, useTimePeriodId} = hooks as jest.Mocked<typeof hooks>;

    let expectedTimePeriodId,
        expectedData,
        expectedNavigation,
        root;

    const render = (): void => {
        root = TestRenderer.create(
            <Income />
        ).root;
    };

    beforeEach(() => {
        expectedData = createRandomQueryResult({
            incomeItems: createRandomIncomeItems()
        });
        expectedTimePeriodId = chance.guid();
        expectedNavigation = {
            navigate: jest.fn()
        };

        useQuery.mockReturnValue(expectedData);
        useTimePeriodId.mockReturnValue(expectedTimePeriodId);
        useMutation.mockReturnValue([jest.fn(), {loading: chance.bool()} as MutationResult]);
        useBudgetNavigation.mockReturnValue(expectedNavigation);

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return early when there is no time period id', () => {
        useTimePeriodId.mockReturnValue('');

        render();

        root.findByType(NoActiveTimePeriod);
    });

    it('should return early when there is no data', () => {
        expectedData.data = undefined;
        useQuery.mockReturnValue(expectedData);

        render();

        const earlyReturn = getEarlyReturn(expectedData);

        root.findByType(earlyReturn.type);
    });

    it('should render a FlatList', () => {
        const renderedFlatList = root.findByType(FlatList);

        expect(renderedFlatList.props.data).toBe(expectedData.data.incomeItems.sort(sortByName));

        const expectedItem = chance.pickone<IIncomeItem>(expectedData.data.incomeItems);

        const renderedItem = renderedFlatList.props.renderItem({item: expectedItem});
        const key = renderedFlatList.props.keyExtractor(expectedItem);

        expect(renderedItem.type).toBe(IncomeItem);
        expect(key).toBe(expectedItem.incomeItemId);

        const renderedListEmptyComponent = renderedFlatList.props.ListEmptyComponent;

        expect(renderedListEmptyComponent.type).toBe(EmptyScreen);
        expect(renderedListEmptyComponent.props.subText).toBe('How does income work?');
        expect(renderedListEmptyComponent.props.titleText).toBe('You don\'t have any income added yet!');

        renderedListEmptyComponent.props.onPressSubText();

        expect(expectedNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(expectedNavigation.navigate).toHaveBeenCalledWith({
            name: Route.INFORMATION,
            params: {
                ref: InformationRef.INCOME
            }
        });
    });
});
