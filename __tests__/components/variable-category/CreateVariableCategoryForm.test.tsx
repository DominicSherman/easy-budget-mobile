import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import * as reactRedux from 'react-redux';

import {chance} from '../../chance';
import {createRandomAppState} from '../../models';
import CreateVariableCategoryForm from '../../../src/components/variable-category/CreateVariableCategoryForm';
import {createVariableCategoryMutation} from '../../../src/graphql/mutations';
import {getUserId} from '../../../src/services/auth-service';
import {createVariableCategoryUpdate} from '../../../src/utils/update-cache-utils';
import Form from '../../../src/components/generic/Form';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../../src/services/auth-service');

describe('CreateVariableCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useSelector} = reactRedux as jest.Mocked<typeof reactRedux>;

    let testRenderer,
        testInstance,
        expectedName,
        expectedAmount,
        expectedTimePeriodId,
        createVariableCategory;

    const updateComponent = (): void => {
        testRenderer.update(<CreateVariableCategoryForm />);

        testInstance = testRenderer.root;
    };

    const setStateData = (): void => {
        const form = testInstance.findByType(Form);

        act(() => {
            form.props.setName(expectedName);
            form.props.setAmount(expectedAmount);
        });

        updateComponent();
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<CreateVariableCategoryForm />);

        testInstance = testRenderer.root;
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
        setStateData();
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

    it('should render a Form with the correct values', () => {
        const renderedCreateCategoryForm = testInstance.findByType(Form);

        const expectedAmount = chance.string();
        const expectedName = chance.string();

        act(() => {
            renderedCreateCategoryForm.props.setAmount(expectedAmount);
            renderedCreateCategoryForm.props.setName(expectedName);
        });
        updateComponent();

        expect(renderedCreateCategoryForm.props.amount).toBe(expectedAmount);
        expect(renderedCreateCategoryForm.props.name).toBe(expectedName);

        act(() => {
            renderedCreateCategoryForm.props.onPress();
        });
        updateComponent();

        expect(createVariableCategory).toHaveBeenCalledTimes(1);
        expect(renderedCreateCategoryForm.props.amount).toBe('');
        expect(renderedCreateCategoryForm.props.name).toBe('');
    });
});
