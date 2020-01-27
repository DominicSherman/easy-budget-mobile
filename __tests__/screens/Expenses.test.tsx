import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import * as reactRedux from 'react-redux';
import {FlatList, View} from 'react-native';

import Expenses from '../../src/screens/Expenses';
import {createRandomAppState, createRandomExpenses, createRandomQueryResult} from '../models';
import {chance} from '../chance';
import {getEarlyReturn} from '../../src/services/error-and-loading-service';
import {sortByDate} from '../../src/utils/sorting-utils';
import {IExpense} from '../../autogen/IExpense';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../src/services/auth-service');

describe('Expenses', () => {
    const {useQuery, useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useSelector} = reactRedux as jest.Mocked<typeof reactRedux>;

    let expectedTimePeriodId,
        expectedData,
        root;

    const render = (): void => {
        root = TestRenderer.create(
            <Expenses />
        ).root;
    };

    beforeEach(() => {
        expectedData = createRandomQueryResult({
            expenses: createRandomExpenses()
        });
        expectedTimePeriodId = chance.guid();

        useQuery.mockReturnValue(expectedData);
        useSelector.mockReturnValue(expectedTimePeriodId);
        // @ts-ignore
        useMutation.mockReturnValue([jest.fn()]);

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call useSelector', () => {
        const expectedState = createRandomAppState();
        const selector = useSelector.mock.calls[0][0](expectedState);

        expect(selector).toBe(expectedState.timePeriodId);
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

        expect(renderedFlatList.props.data).toBe(expectedData.data.expenses.sort(sortByDate));

        const expectedItem = chance.pickone<IExpense>(expectedData.data.expenses);

        const renderedItem = renderedFlatList.props.renderItem({item: expectedItem});
        const key = renderedFlatList.props.keyExtractor(expectedItem);

        expect(renderedItem.type).toBe(View);
        expect(key).toBe(expectedItem.expenseId);
    });
});