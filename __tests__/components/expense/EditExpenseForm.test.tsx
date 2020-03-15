import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import * as reactNavigation from '@react-navigation/native';

import {chance} from '../../chance';
import {createRandomExpense, createRandomQueryResult, createRandomVariableCategories} from '../../models';
import EditExpenseForm from '../../../src/components/expense/EditExpenseForm';
import {updateExpenseMutation} from '../../../src/graphql/mutations';
import ExpenseForm from '../../../src/components/expense/ExpenseForm';

jest.mock('@apollo/react-hooks');
jest.mock('@react-navigation/native');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/hooks');

describe('EditExpenseForm', () => {
    const {useMutation, useQuery} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useNavigation} = reactNavigation as jest.Mocked<typeof reactNavigation>;

    let testRenderer,
        testInstance,
        expectedNavigation,
        expectedProps,
        expectedName,
        expectedAmount,
        expectedCategoryId,
        expectedQueryResult,
        updateExpense;

    const updateComponent = (): void => {
        testRenderer.update(<EditExpenseForm {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    const setStateData = (): void => {
        const form = testInstance.findByType(ExpenseForm);

        act(() => {
            form.props.setName(expectedName);
            form.props.setAmount(expectedAmount);
            form.props.setVariableCategoryId(expectedCategoryId);
        });

        updateComponent();
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<EditExpenseForm {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        expectedProps = {
            expense: createRandomExpense()
        };
        expectedQueryResult = createRandomQueryResult({
            variableCategories: createRandomVariableCategories()
        });
        updateExpense = jest.fn();
        expectedName = chance.string();
        expectedAmount = chance.natural().toString();
        expectedCategoryId = chance.string();
        expectedNavigation = {
            goBack: jest.fn()
        };

        // @ts-ignore
        useMutation.mockReturnValue([updateExpense]);
        useQuery.mockReturnValue(expectedQueryResult);
        useNavigation.mockReturnValue(expectedNavigation);

        render();
        setStateData();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call useMutation', () => {
        const updatedValues = {
            amount: Number(expectedAmount),
            name: expectedName,
            variableCategoryId: expectedCategoryId
        };

        expect(useMutation).toHaveBeenCalledWith(updateExpenseMutation, {
            optimisticResponse: {
                updateExpense: {
                    __typename: 'Expense',
                    ...expectedProps.expense,
                    ...updatedValues
                }
            },
            variables: {
                expense: {
                    expenseId: expectedProps.expense.expenseId,
                    userId: expectedProps.expense.userId,
                    ...updatedValues
                }
            }
        });
    });

    it('should return null if there is no data', () => {
        expectedQueryResult.data = undefined;

        useQuery.mockReturnValue(expectedQueryResult);

        render();

        expect(testInstance.findAllByType(ExpenseForm)).toEqual([]);
    });

    it('should render a ExpenseForm with the correct values', () => {
        const renderedCreateExpenseForm = testInstance.findByType(ExpenseForm);

        expect(renderedCreateExpenseForm.props.amount).toBe(expectedAmount);
        expect(renderedCreateExpenseForm.props.name).toBe(expectedName);
        expect(renderedCreateExpenseForm.props.variableCategoryId).toBe(expectedCategoryId);

        act(() => {
            renderedCreateExpenseForm.props.onPress();
        });
        updateComponent();

        expect(updateExpense).toHaveBeenCalledTimes(1);
    });
});
