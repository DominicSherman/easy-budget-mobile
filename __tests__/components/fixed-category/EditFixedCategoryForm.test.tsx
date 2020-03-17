import TestRenderer, {act} from 'react-test-renderer';
import {Alert} from 'react-native';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {MutationResult} from '@apollo/react-common';

import * as hooks from '../../../src/utils/hooks';
import {chance} from '../../chance';
import {createRandomFixedCategory} from '../../models';
import EditFixedCategoryForm from '../../../src/components/fixed-category/EditFixedCategoryForm';
import {deleteFixedCategoryMutation, updateFixedCategoryMutation} from '../../../src/graphql/mutations';
import Form from '../../../src/components/generic/Form';
import {Color} from '../../../src/constants/color';

jest.mock('@apollo/react-hooks');
jest.mock('@react-navigation/native');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/hooks');
jest.mock('../../../src/services/animation-service');

describe('EditFixedCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useBudgetNavigation} = hooks as jest.Mocked<typeof hooks>;

    let testRenderer,
        testInstance,
        expectedNavigation,
        expectedProps,
        expectedName,
        expectedAmount,
        expectedNote,
        updateFixedCategory,
        deleteFixedCategory;

    const setStateData = (): void => {
        const form = testInstance.findByType(Form);

        act(() => {
            form.props.inputs[0].onChange(expectedName);
            form.props.inputs[1].onChange(expectedAmount);
            form.props.inputs[2].onChange(expectedNote);
        });
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<EditFixedCategoryForm {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        expectedProps = {
            fixedCategory: createRandomFixedCategory(),
            toggleExpanded: jest.fn()
        };
        updateFixedCategory = jest.fn();
        deleteFixedCategory = jest.fn();
        expectedName = chance.string();
        expectedAmount = chance.natural().toString();
        expectedNote = chance.string();
        expectedNavigation = {
            goBack: jest.fn()
        };

        Alert.alert = jest.fn();
        useMutation
            .mockReturnValueOnce([updateFixedCategory, {} as MutationResult])
            .mockReturnValueOnce([deleteFixedCategory, {} as MutationResult])
            .mockReturnValueOnce([updateFixedCategory, {} as MutationResult])
            .mockReturnValueOnce([deleteFixedCategory, {} as MutationResult]);
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
                note: expectedNote
            };

            expect(useMutation).toHaveBeenCalledWith(updateFixedCategoryMutation, {
                optimisticResponse: {
                    updateFixedCategory: {
                        __typename: 'FixedCategory',
                        ...expectedProps.fixedCategory,
                        ...updatedValues
                    }
                },
                variables: {
                    fixedCategory: {
                        fixedCategoryId: expectedProps.fixedCategory.fixedCategoryId,
                        userId: expectedProps.fixedCategory.userId,
                        ...updatedValues
                    }
                }
            });
        });

        it('should useMutation to delete the fixed category', () => {
            expect(useMutation).toHaveBeenCalledWith(deleteFixedCategoryMutation, {
                optimisticResponse: {
                    deleteFixedCategory: expectedProps.fixedCategory.fixedCategoryId
                },
                update: expect.any(Function),
                variables: {
                    fixedCategoryId: expectedProps.fixedCategory.fixedCategoryId,
                    userId: expectedProps.fixedCategory.userId
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
            const noteInput = renderedForm.props.inputs[2];

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
            expect(noteInput).toEqual({
                onChange: expect.any(Function),
                title: 'Note',
                value: expectedNote
            });
        });

        it('should pass the delete button', () => {
            expect(deleteButton).toEqual({
                onPress: expect.any(Function),
                text: 'Delete',
                wrapperStyle: {backgroundColor: Color.red}
            });

            act(() => {
                deleteButton.onPress();
            });

            expect(Alert.alert).toHaveBeenCalledTimes(1);
            expect(Alert.alert).toHaveBeenCalledWith(
                `Delete ${expectedProps.fixedCategory.name}?`,
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

            expect(deleteFixedCategory).toHaveBeenCalledTimes(1);
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

            expect(updateFixedCategory).toHaveBeenCalledTimes(1);
            expect(expectedProps.toggleExpanded).toHaveBeenCalledTimes(1);
        });
    });
});
