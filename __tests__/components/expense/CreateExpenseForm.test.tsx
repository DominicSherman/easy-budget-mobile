import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {Picker, View} from 'react-native';

import {chance} from '../../chance';
import {createRandomExpenses, createRandomVariableCategories} from '../../models';
import CreateExpenseForm from '../../../src/components/expense/CreateExpenseForm';
import {createExpenseMutation} from '../../../src/graphql/mutations';
import {getUserId} from '../../../src/services/auth-service';
import {createExpenseUpdate} from '../../../src/utils/update-cache-utils';
import Button from '../../../src/components/generic/Button';
import {sortByName} from '../../../src/utils/sorting-utils';
import * as hooks from '../../../src/utils/hooks';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/hooks');

describe('CreateExpenseForm', () => {
    const {useMutation, useQuery} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useTimePeriodId} = hooks as jest.Mocked<typeof hooks>;

    let testRenderer,
        testInstance,
        expectedUseQuery,
        expectedName,
        expectedAmount,
        expectedTimePeriodId,
        createExpense;

    const updateComponent = (): void => {
        testRenderer.update(<CreateExpenseForm />);

        testInstance = testRenderer.root;
    };

    const setStateData = (): void => {
        const nameInput = testInstance.findByProps({title: 'Description'});
        const amountInput = testInstance.findByProps({title: 'Amount *'});

        act(() => {
            nameInput.props.onChange(expectedName);
            amountInput.props.onChange(expectedAmount);
        });

        updateComponent();
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<CreateExpenseForm />);

        testInstance = testRenderer.root;
        setStateData();
    };

    beforeEach(() => {
        expectedTimePeriodId = chance.guid();
        createExpense = jest.fn();
        expectedName = chance.string();
        expectedAmount = chance.natural().toString();
        expectedUseQuery = {
            data: {
                expenses: createRandomExpenses(),
                variableCategories: createRandomVariableCategories()
            }
        };

        useQuery.mockReturnValue(expectedUseQuery);
        useTimePeriodId.mockReturnValue(expectedTimePeriodId);
        // @ts-ignore
        useMutation.mockReturnValue([createExpense]);

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return null when there is no queryResult.data', () => {
        // @ts-ignore
        useQuery.mockReturnValue({data: undefined});
        updateComponent();

        expect(testInstance.findAllByType(View)).toEqual([]);
    });

    it('should call useMutation', () => {
        const expense = {
            amount: Number(expectedAmount),
            date: expect.any(String),
            expenseId: expect.any(String),
            name: expectedName,
            timePeriodId: expectedTimePeriodId,
            userId: getUserId(),
            variableCategoryId: expect.any(String)
        };

        expect(useMutation).toHaveBeenCalledWith(createExpenseMutation, {
            optimisticResponse: {
                createExpense: {
                    __typename: 'Expense',
                    ...expense
                }
            },
            update: createExpenseUpdate,
            variables: {
                expense
            }
        });
    });

    it('should pass the category id when there is no category id in state and there are no expenses', () => {
        expectedUseQuery.data.expenses = [];
        useQuery.mockReturnValue(expectedUseQuery);
        render();
        const sortedCategories = expectedUseQuery.data.variableCategories.sort(sortByName);

        testInstance.findByProps({variableCategoryId: sortedCategories[0].variableCategoryId});
    });

    it('should not blow up if there are no expenses or categories', () => {
        expectedUseQuery.data.expenses = [];
        expectedUseQuery.data.variableCategories = [];
        useQuery.mockReturnValue(expectedUseQuery);
        render();
    });

    it('should render a Picker', () => {
        const renderedPicker = testInstance.findByType(Picker);
        const expectedValue = chance.string();

        act(() => {
            renderedPicker.props.onValueChange(expectedValue);
        });
        updateComponent();

        expect(renderedPicker.props.selectedValue).toBe(expectedValue);
    });

    it('should render a Button with the correct onPress', () => {
        const renderedButton = testInstance.findByType(Button);

        act(() => {
            renderedButton.props.onPress();
        });
        updateComponent();

        expect(createExpense).toHaveBeenCalledTimes(1);
    });
});
