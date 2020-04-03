import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {MutationResult} from '@apollo/react-common';

import {chance} from '../../chance';
import CreateIncomeItemForm from '../../../src/components/income/CreateIncomeItemForm';
import {createIncomeItemMutation} from '../../../src/graphql/mutations';
import {getUserId} from '../../../src/services/auth-service';
import {createIncomeItemUpdate} from '../../../src/utils/update-cache-utils';
import Form from '../../../src/components/generic/Form';
import * as hooks from '../../../src/utils/hooks';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/hooks');

describe('CreateIncomeItemForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useTimePeriodId} = hooks as jest.Mocked<typeof hooks>;

    let testRenderer,
        testInstance,
        expectedName,
        expectedAmount,
        expectedRecurring,
        expectedTimePeriodId,
        createIncomeItem;

    const setStateData = (): void => {
        const form = testInstance.findByType(Form);

        act(() => {
            form.props.inputs[0].onChange(expectedName);
            form.props.inputs[1].onChange(expectedAmount);
            form.props.inputs[2].onChange(expectedRecurring);
        });
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<CreateIncomeItemForm />);

        testInstance = testRenderer.root;
        setStateData();
    };

    beforeEach(() => {
        expectedTimePeriodId = chance.guid();
        createIncomeItem = jest.fn();
        expectedName = chance.string();
        expectedAmount = chance.natural().toString();
        expectedRecurring = chance.string();

        useTimePeriodId.mockReturnValue(expectedTimePeriodId);
        useMutation.mockReturnValue([createIncomeItem, {} as MutationResult]);

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call useMutation', () => {
        const incomeItem = {
            amount: Number(expectedAmount),
            incomeItemId: expect.any(String),
            name: expectedName,
            recurring: expectedRecurring,
            timePeriodId: expectedTimePeriodId,
            userId: getUserId()
        };

        expect(useMutation).toHaveBeenCalledWith(createIncomeItemMutation, {
            optimisticResponse: {
                createIncomeItem: {
                    __typename: 'IncomeItem',
                    ...incomeItem
                }
            },
            update: createIncomeItemUpdate,
            variables: {
                incomeItem
            }
        });
    });

    describe('Form', () => {
        let renderedForm,
            updateButton;

        beforeEach(() => {
            setStateData();

            renderedForm = testInstance.findByType(Form);

            updateButton = renderedForm.props.buttons[0];
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

        it('should pass the update button', () => {
            expect(updateButton).toEqual({
                disabled: expect.any(Boolean),
                onPress: expect.any(Function),
                text: 'Create'
            });

            act(() => {
                updateButton.onPress();
            });

            expect(createIncomeItem).toHaveBeenCalledTimes(1);
        });
    });
});
