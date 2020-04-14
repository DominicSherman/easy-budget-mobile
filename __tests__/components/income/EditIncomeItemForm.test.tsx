import TestRenderer, {act} from 'react-test-renderer';
import {Alert} from 'react-native';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {MutationResult} from '@apollo/react-common';

import * as hooks from '../../../src/utils/hooks';
import {chance} from '../../chance';
import {createRandomIncomeItem} from '../../models';
import EditIncomeItemForm from '../../../src/components/income/EditIncomeItemForm';
import {deleteIncomeItemMutation, updateIncomeItemMutation} from '../../../src/graphql/mutations';
import Form from '../../../src/components/generic/Form';
import {Color} from '../../../src/constants/color';

jest.mock('@apollo/react-hooks');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/hooks');
jest.mock('../../../src/services/animation-service');

describe('EditIncomeItemForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useBudgetNavigation} = hooks as jest.Mocked<typeof hooks>;

    let testRenderer,
        testInstance,
        expectedNavigation,
        expectedProps,
        expectedName,
        expectedAmount,
        expectedRecurring,
        updateIncomeItem,
        deleteIncomeItem;

    const setStateData = (): void => {
        const form = testInstance.findByType(Form);

        act(() => {
            form.props.inputs[0].onChange(expectedName);
            form.props.inputs[1].onChange(expectedAmount);
            form.props.inputs[2].onChange(expectedRecurring);
        });
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<EditIncomeItemForm {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        expectedProps = {
            incomeItem: createRandomIncomeItem(),
            toggleExpanded: jest.fn()
        };
        updateIncomeItem = jest.fn();
        deleteIncomeItem = jest.fn();
        expectedName = chance.string();
        expectedAmount = chance.natural().toString();
        expectedRecurring = chance.bool();
        expectedNavigation = {
            goBack: jest.fn()
        };

        Alert.alert = jest.fn();
        useMutation
            .mockReturnValueOnce([updateIncomeItem, {} as MutationResult])
            .mockReturnValueOnce([deleteIncomeItem, {} as MutationResult])
            .mockReturnValueOnce([updateIncomeItem, {} as MutationResult])
            .mockReturnValueOnce([deleteIncomeItem, {} as MutationResult]);
        useBudgetNavigation.mockReturnValue(expectedNavigation);

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('useMutation', () => {
        it('should call useMutation twice', () => {
            expect(useMutation).toHaveBeenCalledTimes(2);
        });

        it('should call useMutation to update the fixed category', () => {
            setStateData();

            const updatedValues = {
                amount: Number(expectedAmount),
                name: expectedName,
                recurring: expectedRecurring
            };

            expect(useMutation).toHaveBeenCalledWith(updateIncomeItemMutation, {
                optimisticResponse: {
                    updateIncomeItem: {
                        __typename: 'IncomeItem',
                        ...expectedProps.incomeItem,
                        ...updatedValues
                    }
                },
                variables: {
                    incomeItem: {
                        incomeItemId: expectedProps.incomeItem.incomeItemId,
                        userId: expectedProps.incomeItem.userId,
                        ...updatedValues
                    }
                }
            });
        });

        it('should useMutation to delete the fixed category', () => {
            expect(useMutation).toHaveBeenCalledWith(deleteIncomeItemMutation, {
                optimisticResponse: {
                    deleteIncomeItem: expectedProps.incomeItem.incomeItemId
                },
                update: expect.any(Function),
                variables: {
                    incomeItemId: expectedProps.incomeItem.incomeItemId,
                    userId: expectedProps.incomeItem.userId
                }
            });
        });
    });

    describe('Form', () => {
        let renderedForm,
            deleteButton,
            updateButton;

        beforeEach(() => {
            setStateData();

            renderedForm = testInstance.findByType(Form);

            deleteButton = renderedForm.props.buttons[0];
            updateButton = renderedForm.props.buttons[1];
        });

        it('should render a Form with the correct inputs', () => {
            const nameInput = renderedForm.props.inputs[0];
            const amountInput = renderedForm.props.inputs[1];
            const recurringInput = renderedForm.props.inputs[2];

            expect(nameInput).toEqual({
                onChange: expect.any(Function),
                title: 'Category Name *',
                value: expectedName
            });
            expect(amountInput).toEqual({
                keyboardType: 'number-pad',
                onChange: expect.any(Function),
                title: 'Category Amount *',
                value: expectedAmount
            });
            expect(recurringInput).toEqual({
                checked: expectedRecurring,
                isToggle: true,
                onChange: expect.any(Function),
                title: 'Recurring'
            });
        });

        it('should pass the delete button', () => {
            expect(deleteButton).toEqual({
                onPress: expect.any(Function),
                text: 'Delete',
                wrapperStyle: {backgroundColor: Color.peach}
            });

            act(() => {
                deleteButton.onPress();
            });

            expect(Alert.alert).toHaveBeenCalledTimes(1);
            expect(Alert.alert).toHaveBeenCalledWith(
                `Delete ${expectedProps.incomeItem.name}?`,
                '',
                [
                    {text: 'Cancel'},
                    {
                        onPress: expect.any(Function),
                        text: 'Confirm'
                    }
                ]
            );

            // @ts-ignore
            Alert.alert.mock.calls[0][2][1].onPress();

            expect(deleteIncomeItem).toHaveBeenCalledTimes(1);
        });

        it('should pass the update button', () => {
            expect(updateButton).toEqual({
                disabled: expect.any(Boolean),
                onPress: expect.any(Function),
                text: 'Update'
            });

            act(() => {
                updateButton.onPress();
            });

            expect(updateIncomeItem).toHaveBeenCalledTimes(1);
            expect(expectedProps.toggleExpanded).toHaveBeenCalledTimes(1);
        });
    });
});
