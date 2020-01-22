import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import * as reactRedux from 'react-redux';

import {chance} from '../chance';
import {createRandomAppState} from '../models';
import CreateCategoryForm from '../../src/components/CreateCategoryForm';
import {createVariableCategoryMutation} from '../../src/graphql/mutations';
import {getUserId} from '../../src/services/auth-service';
import {createVariableCategoryUpdate} from '../../src/utils/update-cache-utils';
import Button from '../../src/components/generic/Button';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../src/services/auth-service');

describe('CreateCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useSelector} = reactRedux as jest.Mocked<typeof reactRedux>;

    let testRenderer,
        testInstance,
        expectedName,
        expectedAmount,
        expectedTimePeriodId,
        createVariableCategory;

    const updateComponent = (): void => {
        testRenderer.update(<CreateCategoryForm />);

        testInstance = testRenderer.root;
    };

    const setStateData = (): void => {
        const nameInput = testInstance.findByProps({title: 'Category Name'});
        const amountInput = testInstance.findByProps({title: 'Category Amount'});

        act(() => {
            nameInput.props.onChange(expectedName);
            amountInput.props.onChange(expectedAmount);
        });

        updateComponent();
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<CreateCategoryForm />);

        testInstance = testRenderer.root;
        setStateData();
    };

    beforeEach(() => {
        expectedTimePeriodId = chance.guid();
        createVariableCategory = jest.fn();
        expectedName = chance.string();
        expectedAmount = chance.natural().toString();

        useSelector.mockReturnValue(expectedTimePeriodId);
        // @ts-ignore
        useMutation.mockReturnValue([createVariableCategory]);

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call useSelector', () => {
        const expectedState = createRandomAppState();

        const actualTimePeriodId = useSelector.mock.calls[0][0](expectedState);

        expect(actualTimePeriodId).toEqual(expectedState.timePeriodId);
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

    it('should render a button', () => {
        const renderedButton = testInstance.findByType(Button);

        act(() => {
            renderedButton.props.onPress();
        });
        updateComponent();

        const nameInput = testInstance.findByProps({title: 'Category Name'});
        const amountInput = testInstance.findByProps({title: 'Category Amount'});

        expect(nameInput.props.value).toBe('');
        expect(amountInput.props.value).toBe('');
        expect(createVariableCategory).toHaveBeenCalledTimes(1);
        expect(createVariableCategory).toHaveBeenCalledWith();
    });
});
