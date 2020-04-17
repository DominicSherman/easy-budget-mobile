import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {MutationResult} from '@apollo/react-common';

import {chance} from '../../chance';
import CreateVariableCategoryForm from '../../../src/components/variable-category/CreateVariableCategoryForm';
import {createVariableCategoryMutation} from '../../../src/graphql/mutations';
import {getUserId} from '../../../src/services/auth-service';
import {createVariableCategoryUpdate} from '../../../src/utils/update-cache-utils';
import Form from '../../../src/components/generic/Form';
import * as hooks from '../../../src/utils/hooks';
import {Mode} from '../../../src/enums/Mode';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/hooks');

describe('CreateVariableCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useTimePeriodId, useMode, useThemedSelectedColor} = hooks as jest.Mocked<typeof hooks>;

    let testRenderer,
        testInstance,
        expectedName,
        expectedAmount,
        expectedTimePeriodId,
        expectedThemedSelectedColor,
        createVariableCategory;

    const setStateData = (): void => {
        const form = testInstance.findByType(Form);

        act(() => {
            form.props.inputs[0].onChange(expectedName);
            form.props.inputs[1].onChange(expectedAmount);
        });
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<CreateVariableCategoryForm />);

        testInstance = testRenderer.root;
        setStateData();
    };

    beforeEach(() => {
        expectedTimePeriodId = chance.guid();
        createVariableCategory = jest.fn();
        expectedName = chance.string();
        expectedAmount = chance.natural().toString();
        expectedThemedSelectedColor = chance.string();

        useTimePeriodId.mockReturnValue(expectedTimePeriodId);
        useMutation.mockReturnValue([createVariableCategory, {} as MutationResult]);
        useThemedSelectedColor.mockReturnValue(expectedThemedSelectedColor);
        useMode.mockReturnValue(chance.pickone(Object.values(Mode)));

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call useMutation', () => {
        const variableCategory = {
            amount: Number(expectedAmount),
            name: expectedName,
            timePeriodId: expectedTimePeriodId,
            userId: getUserId(),
            variableCategoryId: expect.any(String)
        };

        expect(useMutation).toHaveBeenCalledWith(createVariableCategoryMutation, {
            optimisticResponse: {
                createVariableCategory: {
                    __typename: 'VariableCategory',
                    ...variableCategory
                }
            },
            update: createVariableCategoryUpdate,
            variables: {
                variableCategory
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

            expect(nameInput).toEqual({
                onChange: expect.any(Function),
                title: 'Name *',
                value: expectedName
            });
            expect(amountInput).toEqual({
                keyboardType: 'number-pad',
                onChange: expect.any(Function),
                title: 'Amount *',
                value: expectedAmount
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

            expect(createVariableCategory).toHaveBeenCalledTimes(1);
        });
    });
});
