import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {MutationResult} from '@apollo/react-common';

import {chance} from '../../chance';
import AddRemoveDebtCategoryForm, {DebtUpdateType} from '../../../src/components/debt-category/AddRemoveDebtCategoryForm';
import {updateDebtCategoryMutation} from '../../../src/graphql/mutations';
import Form from '../../../src/components/generic/Form';
import {createRandomDebtCategory} from '../../models';
import {Color} from '../../../src/constants/color';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/hooks');

describe('AddRemoveDebtCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;

    let expectedProps,
        testRenderer,
        testInstance,
        expectedAmount,
        updateDebtCategory;

    const setStateData = (): void => {
        const form = testInstance.findByType(Form);

        act(() => {
            form.props.inputs[0].onChange(expectedAmount);
        });
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<AddRemoveDebtCategoryForm {...expectedProps} />);

        testInstance = testRenderer.root;
        setStateData();
    };

    beforeEach(() => {
        updateDebtCategory = jest.fn();
        expectedAmount = chance.natural().toString();
        expectedProps = {
            debtCategory: createRandomDebtCategory(),
            toggleExpanded: jest.fn(),
            type: chance.pickone(Object.values(DebtUpdateType))
        };

        useMutation.mockReturnValue([updateDebtCategory, {} as MutationResult]);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('ADD', () => {
        beforeEach(() => {
            expectedProps.type = DebtUpdateType.ADD;

            render();
        });

        it('should call useMutation', () => {
            const updatedAmount = expectedProps.debtCategory.amount + Number(expectedAmount);

            expect(useMutation).toHaveBeenCalledWith(updateDebtCategoryMutation, {
                optimisticResponse: {
                    updateDebtCategory: {
                        ...expectedProps.debtCategory,
                        amount: updatedAmount
                    }
                },
                variables: {
                    debtCategory: {
                        amount: updatedAmount,
                        debtCategoryId: expectedProps.debtCategory.debtCategoryId,
                        userId: expectedProps.debtCategory.userId
                    }
                }
            });
        });
    });

    describe('REMOVE', () => {
        beforeEach(() => {
            expectedProps.type = DebtUpdateType.REMOVE;

            render();
        });

        it('should call useMutation', () => {
            const updatedAmount = expectedProps.debtCategory.amount - Number(expectedAmount);

            expect(useMutation).toHaveBeenCalledWith(updateDebtCategoryMutation, {
                optimisticResponse: {
                    updateDebtCategory: {
                        ...expectedProps.debtCategory,
                        amount: updatedAmount
                    }
                },
                variables: {
                    debtCategory: {
                        amount: updatedAmount,
                        debtCategoryId: expectedProps.debtCategory.debtCategoryId,
                        userId: expectedProps.debtCategory.userId
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

            expect(testInstance.findAllByType(AddRemoveDebtCategoryForm)).toHaveLength(1);
        });

        it('should pass the update button', () => {
            expect(updateButton).toEqual({
                disabled: expect.any(Boolean),
                onPress: expect.any(Function),
                text: expectedProps.type
            });

            act(() => {
                updateButton.onPress();
            });

            expect(updateDebtCategory).toHaveBeenCalledTimes(1);
        });
    });
});
