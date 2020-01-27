import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import * as reactRedux from 'react-redux';
import moment from 'moment';
import {View} from 'react-native';

import {chance} from '../../chance';
import {createRandomAppState, createRandomExpenses, createRandomVariableCategories} from '../../models';
import CreateExpenseForm from '../../../src/components/budget/CreateExpenseForm';
import {createExpenseMutation} from '../../../src/graphql/mutations';
import {getUserId} from '../../../src/services/auth-service';
import {createExpenseUpdate} from '../../../src/utils/update-cache-utils';
import Button from '../../../src/components/generic/Button';

jest.spyOn(Date, 'now').mockImplementation(() => 0);
jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../../src/services/auth-service');

describe('CreateExpenseForm', () => {
    const {useMutation, useQuery} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useSelector} = reactRedux as jest.Mocked<typeof reactRedux>;

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
        const nameInput = testInstance.findByProps({title: 'Expense Name'});
        const amountInput = testInstance.findByProps({title: 'Expense Amount'});

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
        useSelector.mockReturnValue(expectedTimePeriodId);
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

    it('should call useSelector', () => {
        const expectedState = createRandomAppState();

        const actualTimePeriodId = useSelector.mock.calls[0][0](expectedState);

        expect(actualTimePeriodId).toEqual(expectedState.timePeriodId);
    });

    it('should call useMutation', () => {
        const expense = {
            amount: Number(expectedAmount),
            date: moment().toISOString(),
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

    it('should render a Button with the correct onPress', () => {
        const renderedButton = testInstance.findByType(Button);

        act(() => {
            renderedButton.props.onPress();
        });
        updateComponent();

        expect(createExpense).toHaveBeenCalledTimes(1);
    });
});
