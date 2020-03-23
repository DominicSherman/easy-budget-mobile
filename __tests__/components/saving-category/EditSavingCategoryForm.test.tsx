import TestRenderer, {act} from 'react-test-renderer';
import {Alert} from 'react-native';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {MutationResult} from '@apollo/react-common';

import * as hooks from '../../../src/utils/hooks';
import {chance} from '../../chance';
import {createRandomSavingCategory} from '../../models';
import EditSavingCategoryForm from '../../../src/components/saving-category/EditSavingCategoryForm';
import {deleteSavingCategoryMutation, updateSavingCategoryMutation} from '../../../src/graphql/mutations';
import Form from '../../../src/components/generic/Form';
import {Color} from '../../../src/constants/color';
import {deleteSavingCategoryUpdate} from '../../../src/utils/update-cache-utils';

jest.mock('@apollo/react-hooks');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/hooks');
jest.mock('../../../src/services/animation-service');

describe('EditSavingCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useBudgetNavigation} = hooks as jest.Mocked<typeof hooks>;

    let testRenderer,
        testInstance,
        expectedNavigation,
        expectedProps,
        expectedName,
        updateSavingCategory,
        deleteSavingCategory;

    const setStateData = (): void => {
        const form = testInstance.findByType(Form);

        act(() => {
            form.props.inputs[0].onChange(expectedName);
        });
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<EditSavingCategoryForm {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        expectedProps = {
            savingCategory: createRandomSavingCategory(),
            toggleExpanded: jest.fn()
        };
        updateSavingCategory = jest.fn();
        deleteSavingCategory = jest.fn();
        expectedName = chance.string();
        expectedNavigation = {
            goBack: jest.fn()
        };

        Alert.alert = jest.fn();
        useMutation
            .mockReturnValueOnce([updateSavingCategory, {} as MutationResult])
            .mockReturnValueOnce([deleteSavingCategory, {} as MutationResult])
            .mockReturnValueOnce([updateSavingCategory, {} as MutationResult])
            .mockReturnValueOnce([deleteSavingCategory, {} as MutationResult]);
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

            expect(useMutation).toHaveBeenCalledWith(updateSavingCategoryMutation, {
                optimisticResponse: {
                    updateSavingCategory: {
                        ...expectedProps.savingCategory,
                        ...updatedValues
                    }
                },
                variables: {
                    savingCategory: {
                        savingCategoryId: expectedProps.savingCategory.savingCategoryId,
                        userId: expectedProps.savingCategory.userId,
                        ...updatedValues
                    }
                }
            });
        });

        it('should useMutation to delete the fixed category', () => {
            expect(useMutation).toHaveBeenCalledWith(deleteSavingCategoryMutation, {
                optimisticResponse: {
                    deleteSavingCategory: expectedProps.savingCategory.savingCategoryId
                },
                update: deleteSavingCategoryUpdate,
                variables: {
                    savingCategoryId: expectedProps.savingCategory.savingCategoryId,
                    userId: expectedProps.savingCategory.userId
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
                wrapperStyle: {backgroundColor: Color.red}
            });

            act(() => {
                deleteButton.onPress();
            });

            expect(Alert.alert).toHaveBeenCalledTimes(1);
            expect(Alert.alert).toHaveBeenCalledWith(
                `Delete ${expectedProps.savingCategory.name}?`,
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

            expect(deleteSavingCategory).toHaveBeenCalledTimes(1);
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

            expect(updateSavingCategory).toHaveBeenCalledTimes(1);
            expect(expectedProps.toggleExpanded).toHaveBeenCalledTimes(1);
        });
    });
});
