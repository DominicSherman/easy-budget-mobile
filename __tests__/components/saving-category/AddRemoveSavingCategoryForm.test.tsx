import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {MutationResult} from '@apollo/react-common';

import {chance} from '../../chance';
import AddRemoveSavingCategoryForm, {SavingUpdateType} from '../../../src/components/saving-category/AddRemoveSavingCategoryForm';
import {updateSavingCategoryMutation} from '../../../src/graphql/mutations';
import Form from '../../../src/components/generic/Form';
import {createRandomSavingCategory} from '../../models';
import {Color} from '../../../src/constants/color';
import {useThemedSelectedColor} from '../../../src/utils/hooks';
import {Theme} from '../../../src/services/theme-service';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/hooks');

describe('AddRemoveSavingCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;

    let expectedProps,
        testRenderer,
        testInstance,
        expectedAmount,
        updateSavingCategory;

    const setStateData = (): void => {
        const form = testInstance.findByType(Form);

        act(() => {
            form.props.inputs[0].onChange(expectedAmount);
        });
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<AddRemoveSavingCategoryForm {...expectedProps} />);

        testInstance = testRenderer.root;
        setStateData();
    };

    beforeEach(() => {
        updateSavingCategory = jest.fn();
        expectedAmount = chance.natural().toString();
        expectedProps = {
            savingCategory: createRandomSavingCategory(),
            toggleExpanded: jest.fn(),
            type: chance.pickone(Object.values(SavingUpdateType))
        };

        useMutation.mockReturnValue([updateSavingCategory, {} as MutationResult]);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('ADD', () => {
        beforeEach(() => {
            expectedProps.type = SavingUpdateType.ADD;

            render();
        });

        it('should call useMutation', () => {
            const updatedAmount = expectedProps.savingCategory.amount + Number(expectedAmount);

            expect(useMutation).toHaveBeenCalledWith(updateSavingCategoryMutation, {
                optimisticResponse: {
                    updateSavingCategory: {
                        ...expectedProps.savingCategory,
                        amount: updatedAmount
                    }
                },
                variables: {
                    savingCategory: {
                        amount: updatedAmount,
                        savingCategoryId: expectedProps.savingCategory.savingCategoryId,
                        userId: expectedProps.savingCategory.userId
                    }
                }
            });
        });
    });

    describe('REMOVE', () => {
        beforeEach(() => {
            expectedProps.type = SavingUpdateType.REMOVE;

            render();
        });

        it('should call useMutation', () => {
            const updatedAmount = expectedProps.savingCategory.amount - Number(expectedAmount);

            expect(useMutation).toHaveBeenCalledWith(updateSavingCategoryMutation, {
                optimisticResponse: {
                    updateSavingCategory: {
                        ...expectedProps.savingCategory,
                        amount: updatedAmount
                    }
                },
                variables: {
                    savingCategory: {
                        amount: updatedAmount,
                        savingCategoryId: expectedProps.savingCategory.savingCategoryId,
                        userId: expectedProps.savingCategory.userId
                    }
                }
            });
        });
    });

    describe('Form', () => {
        let renderedForm,
            cancelButton,
            updateButton;

        beforeEach(() => {
            render();

            renderedForm = testInstance.findByType(Form);

            cancelButton = renderedForm.props.buttons[0];
            updateButton = renderedForm.props.buttons[1];
        });

        it('should render a Form with the correct inputs', () => {
            const amountInput = renderedForm.props.inputs[0];

            expect(amountInput).toEqual({
                keyboardType: 'number-pad',
                onChange: expect.any(Function),
                title: `${expectedProps.type} Amount`,
                value: expectedAmount
            });
        });

        it('should pass the cancel button', () => {
            expect(cancelButton).toEqual({
                onPress: expect.any(Function),
                text: 'Cancel',
                wrapperStyle: {backgroundColor: Color.peach}
            });

            act(() => {
                cancelButton.onPress();
            });

            expect(testInstance.findAllByType(AddRemoveSavingCategoryForm)).toHaveLength(1);
        });

        it('should pass the update button', () => {
            expect(updateButton).toEqual({
                disabled: expect.any(Boolean),
                onPress: expect.any(Function),
                text: expectedProps.type,
                wrapperStyle: {
                    backgroundColor: Color.brightGreen
                }
            });

            act(() => {
                updateButton.onPress();
            });

            expect(updateSavingCategory).toHaveBeenCalledTimes(1);
        });
    });
});
