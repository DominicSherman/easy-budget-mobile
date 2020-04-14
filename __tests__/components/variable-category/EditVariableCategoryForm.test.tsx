import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {Alert} from 'react-native';
import {MutationResult} from '@apollo/react-common';

import {chance} from '../../chance';
import {createRandomVariableCategory} from '../../models';
import EditVariableCategoryForm from '../../../src/components/variable-category/EditVariableCategoryForm';
import {deleteVariableCategoryMutation, updateVariableCategoryMutation} from '../../../src/graphql/mutations';
import Form from '../../../src/components/generic/Form';
import * as hooks from '../../../src/utils/hooks';
import {Color} from '../../../src/constants/color';

jest.mock('@apollo/react-hooks');
jest.mock('@react-navigation/native');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/hooks');
jest.mock('../../../src/services/animation-service');

describe('EditVariableCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useBudgetNavigation} = hooks as jest.Mocked<typeof hooks>;

    let testRenderer,
        testInstance,
        expectedNavigation,
        expectedProps,
        expectedName,
        expectedAmount,
        updateVariableCategory,
        deleteVariableCategory;

    const setStateData = (): void => {
        const form = testInstance.findByType(Form);

        act(() => {
            form.props.inputs[0].onChange(expectedName);
            form.props.inputs[1].onChange(expectedAmount);
        });
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<EditVariableCategoryForm {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        expectedProps = {
            toggleExpanded: jest.fn(),
            variableCategory: createRandomVariableCategory()
        };
        expectedNavigation = {goBack: jest.fn()};
        updateVariableCategory = jest.fn();
        expectedName = chance.string();
        expectedAmount = chance.natural().toString();
        deleteVariableCategory = jest.fn();

        Alert.alert = jest.fn();

        useMutation
            .mockReturnValueOnce([updateVariableCategory, {} as MutationResult])
            .mockReturnValueOnce([deleteVariableCategory, {} as MutationResult])
            .mockReturnValueOnce([updateVariableCategory, {} as MutationResult])
            .mockReturnValueOnce([deleteVariableCategory, {} as MutationResult]);
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

        it('should call useMutation to update the variable category', () => {
            setStateData();

            const updatedValues = {
                amount: Number(expectedAmount),
                name: expectedName
            };

            expect(useMutation).toHaveBeenCalledWith(updateVariableCategoryMutation, {
                optimisticResponse: {
                    updateVariableCategory: {
                        __typename: 'VariableCategory',
                        ...expectedProps.variableCategory,
                        ...updatedValues
                    }
                },
                variables: {
                    variableCategory: {
                        userId: expectedProps.variableCategory.userId,
                        variableCategoryId: expectedProps.variableCategory.variableCategoryId,
                        ...updatedValues
                    }
                }
            });
        });

        it('should call useMutation to delete the variable category', () => {
            expect(useMutation).toHaveBeenCalledWith(deleteVariableCategoryMutation, {
                optimisticResponse: {
                    deleteVariableCategory: expectedProps.variableCategory.variableCategoryId
                },
                update: expect.any(Function),
                variables: {
                    userId: expectedProps.variableCategory.userId,
                    variableCategoryId: expectedProps.variableCategory.variableCategoryId
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
                `Delete ${expectedProps.variableCategory.name}?`,
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

            expect(deleteVariableCategory).toHaveBeenCalledTimes(1);
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

            expect(updateVariableCategory).toHaveBeenCalledTimes(1);
            expect(expectedProps.toggleExpanded).toHaveBeenCalledTimes(1);
        });
    });
});
