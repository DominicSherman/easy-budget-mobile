import TestRenderer, {act} from 'react-test-renderer';
import {Alert} from 'react-native';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {MutationResult} from '@apollo/react-common';

import * as hooks from '../../../src/utils/hooks';
import {chance} from '../../chance';
import {createRandomDebtCategory} from '../../models';
import EditDebtCategoryForm from '../../../src/components/debt-category/EditDebtCategoryForm';
import {deleteDebtCategoryMutation, updateDebtCategoryMutation} from '../../../src/graphql/mutations';
import Form from '../../../src/components/generic/Form';
import {Color} from '../../../src/constants/color';
import {deleteDebtCategoryUpdate} from '../../../src/utils/update-cache-utils';

jest.mock('@apollo/react-hooks');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/hooks');
jest.mock('../../../src/services/animation-service');

describe('EditDebtCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useBudgetNavigation} = hooks as jest.Mocked<typeof hooks>;

    let testRenderer,
        testInstance,
        expectedNavigation,
        expectedProps,
        expectedName,
        updateDebtCategory,
        deleteDebtCategory;

    const setStateData = (): void => {
        const form = testInstance.findByType(Form);

        act(() => {
            form.props.inputs[0].onChange(expectedName);
        });
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<EditDebtCategoryForm {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        expectedProps = {
            debtCategory: createRandomDebtCategory(),
            toggleExpanded: jest.fn()
        };
        updateDebtCategory = jest.fn();
        deleteDebtCategory = jest.fn();
        expectedName = chance.string();
        expectedNavigation = {
            goBack: jest.fn()
        };

        Alert.alert = jest.fn();
        useMutation
            .mockReturnValueOnce([updateDebtCategory, {} as MutationResult])
            .mockReturnValueOnce([deleteDebtCategory, {} as MutationResult])
            .mockReturnValueOnce([updateDebtCategory, {} as MutationResult])
            .mockReturnValueOnce([deleteDebtCategory, {} as MutationResult]);
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
                name: expectedName
            };

            expect(useMutation).toHaveBeenCalledWith(updateDebtCategoryMutation, {
                optimisticResponse: {
                    updateDebtCategory: {
                        ...expectedProps.debtCategory,
                        ...updatedValues
                    }
                },
                variables: {
                    debtCategory: {
                        debtCategoryId: expectedProps.debtCategory.debtCategoryId,
                        userId: expectedProps.debtCategory.userId,
                        ...updatedValues
                    }
                }
            });
        });

        it('should useMutation to delete the fixed category', () => {
            expect(useMutation).toHaveBeenCalledWith(deleteDebtCategoryMutation, {
                optimisticResponse: {
                    deleteDebtCategory: expectedProps.debtCategory.debtCategoryId
                },
                update: deleteDebtCategoryUpdate,
                variables: {
                    debtCategoryId: expectedProps.debtCategory.debtCategoryId,
                    userId: expectedProps.debtCategory.userId
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

            expect(nameInput).toEqual({
                onChange: expect.any(Function),
                title: 'Category Name *',
                value: expectedName
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
                `Delete ${expectedProps.debtCategory.name}?`,
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

            expect(deleteDebtCategory).toHaveBeenCalledTimes(1);
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

            expect(updateDebtCategory).toHaveBeenCalledTimes(1);
            expect(expectedProps.toggleExpanded).toHaveBeenCalledTimes(1);
        });
    });
});
