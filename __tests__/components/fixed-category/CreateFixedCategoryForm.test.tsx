import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';

import {chance} from '../../chance';
import CreateFixedCategoryForm from '../../../src/components/fixed-category/CreateFixedCategoryForm';
import {createFixedCategoryMutation} from '../../../src/graphql/mutations';
import {getUserId} from '../../../src/services/auth-service';
import {createFixedCategoryUpdate} from '../../../src/utils/update-cache-utils';
import Form from '../../../src/components/generic/Form';
import * as hooks from '../../../src/utils/hooks';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/hooks');

describe('CreateFixedCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useTimePeriodId} = hooks as jest.Mocked<typeof hooks>;

    let testRenderer,
        testInstance,
        expectedName,
        expectedAmount,
        expectedNote,
        expectedTimePeriodId,
        createFixedCategory;

    const setStateData = (): void => {
        const form = testInstance.findByType(Form);

        act(() => {
            form.props.inputs[0].onChange(expectedName);
            form.props.inputs[1].onChange(expectedAmount);
            form.props.inputs[2].onChange(expectedNote);
        });
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<CreateFixedCategoryForm />);

        testInstance = testRenderer.root;
        setStateData();
    };

    beforeEach(() => {
        expectedTimePeriodId = chance.guid();
        createFixedCategory = jest.fn();
        expectedName = chance.string();
        expectedAmount = chance.natural().toString();
        expectedNote = chance.string();

        useTimePeriodId.mockReturnValue(expectedTimePeriodId);
        // @ts-ignore
        useMutation.mockReturnValue([createFixedCategory]);

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call useMutation', () => {
        const fixedCategory = {
            amount: Number(expectedAmount),
            fixedCategoryId: expect.any(String),
            name: expectedName,
            note: expectedNote,
            paid: false,
            timePeriodId: expectedTimePeriodId,
            userId: getUserId()
        };

        expect(useMutation).toHaveBeenCalledWith(createFixedCategoryMutation, {
            optimisticResponse: {
                createFixedCategory: {
                    __typename: 'FixedCategory',
                    ...fixedCategory
                }
            },
            update: createFixedCategoryUpdate,
            variables: {
                fixedCategory
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

        it('should pass the update button', () => {
            expect(updateButton).toEqual({
                disabled: expect.any(Boolean),
                onPress: expect.any(Function),
                text: 'Create'
            });

            act(() => {
                updateButton.onPress();
            });

            expect(createFixedCategory).toHaveBeenCalledTimes(1);
        });
    });
});
