import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {FlatList} from 'react-native';
import {MutationResult} from '@apollo/react-common';

import Expenses from '../../src/screens/Expenses';
import {
    createRandomExpense,
    createRandomExpenses,
    createRandomQueryResult,
    createRandomTimePeriod,
    createRandomTimePeriods,
    createRandomVariableCategories,
    createRandomVariableCategory
} from '../models';
import {chance} from '../chance';
import {getEarlyReturn} from '../../src/services/error-and-loading-service';
import {sortByDate} from '../../src/utils/sorting-utils';
import {IExpense} from '../../autogen/IExpense';
import ExpenseItem from '../../src/components/expense/ExpenseItem';
import EmptyScreen from '../../src/components/generic/EmptyScreen';
import {Route} from '../../src/enums/Route';
import {InformationRef} from '../../src/screens/Information';
import * as hooks from '../../src/utils/hooks';
import {Color} from '../../src/constants/color';
import {getTimePeriodQuery, getTimePeriodsQuery} from '../../src/graphql/queries';
import TimePeriods from '../../src/screens/TimePeriods';
import {Mode} from '../../src/enums/Mode';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('@react-navigation/native');
jest.mock('../../src/services/auth-service');
jest.mock('../../src/utils/hooks');

describe('Expenses', () => {
    const {useQuery, useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useBudgetNavigation, useTheme, useTimePeriodId, useMode} = hooks as jest.Mocked<typeof hooks>;

    let expectedTimePeriodId,
        expectedData,
        expectedNavigation,
        root;

    const render = (): void => {
        root = TestRenderer.create(
            <Expenses />
        ).root;
    };

    beforeEach(() => {
        const matchingCategoryId = chance.guid();

        expectedData = createRandomQueryResult({
            expenses: chance.shuffle([...createRandomExpenses(), createRandomExpense({variableCategoryId: matchingCategoryId})]),
            variableCategories: chance.shuffle([...createRandomVariableCategories(), createRandomVariableCategory({variableCategoryId: matchingCategoryId})])
        });
        expectedTimePeriodId = chance.guid();
        expectedNavigation = {
            navigate: jest.fn()
        };

        useQuery.mockImplementation((query) => {
            if (query === getTimePeriodsQuery) {
                return {
                    data: {
                        timePeriods: createRandomTimePeriods()
                    }
                };
            } else if (query === getTimePeriodQuery) {
                return {
                    data: {
                        timePeriod: createRandomTimePeriod()
                    }
                };
            }

            return expectedData;
        });
        useTimePeriodId.mockReturnValue(expectedTimePeriodId);
        useMutation.mockReturnValue([jest.fn(), {loading: chance.bool()} as MutationResult]);
        useBudgetNavigation.mockReturnValue(expectedNavigation);
        useTheme.mockReturnValue({
            backgroundColor: chance.pickone(Object.values(Color)),
            textColor: chance.pickone(Object.values(Color))
        });
        useMode.mockReturnValue(chance.pickone(Object.values(Mode)));

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return early if there is no time period', () => {
        useTimePeriodId.mockReturnValue('');
        render();

        root.findByType(TimePeriods);
    });

    it('should return early when there is no data', () => {
        expectedData.data = undefined;
        useQuery.mockReturnValue(expectedData);

        render();

        const earlyReturn = getEarlyReturn(expectedData);

        root.findByType(earlyReturn.type);
    });

    it('should return early if there are no variable categories', () => {
        expectedData.data.variableCategories = [];
        useQuery.mockReturnValue(expectedData);

        render();

        const renderedEmptyScreen = root.findByType(EmptyScreen);

        renderedEmptyScreen.props.onPressSubText();

        expect(expectedNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(expectedNavigation.navigate).toHaveBeenCalledWith({
            name: Route.VARIABLE_CATEGORIES,
            params: {}
        });
    });

    it('should render a FlatList', () => {
        const renderedFlatList = root.findByType(FlatList);

        expect(renderedFlatList.props.data).toBe(expectedData.data.expenses.sort(sortByDate));

        const expectedItem = chance.pickone<IExpense>(expectedData.data.expenses);

        const renderedItem = renderedFlatList.props.renderItem({item: expectedItem});
        const key = renderedFlatList.props.keyExtractor(expectedItem);

        expect(renderedItem.type).toBe(ExpenseItem);
        expect(key).toBe(expectedItem.expenseId);

        renderedFlatList.props.ListEmptyComponent.props.onPressSubText();

        expect(expectedNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(expectedNavigation.navigate).toHaveBeenCalledWith({
            name: Route.INFORMATION,
            params: {
                ref: InformationRef.EXPENSE
            }
        });
    });
});
