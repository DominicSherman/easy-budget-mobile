import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';

import {chance} from '../../chance';
import {createRandomVariableCategory} from '../../models';
import EditVariableCategoryForm from '../../../src/components/budget/EditVariableCategoryForm';
import {updateVariableCategoryMutation} from '../../../src/graphql/mutations';
import CreateEditCategoryForm from '../../../src/components/budget/CreateEditCategoryForm';

jest.mock('@apollo/react-hooks');
jest.mock('../../../src/services/auth-service');

describe('EditVariableCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;

    let testRenderer,
        testInstance,
        expectedProps,
        expectedName,
        expectedAmount,
        updateVariableCategory;

    const updateComponent = (): void => {
        testRenderer.update(<EditVariableCategoryForm {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    const setStateData = (): void => {
        const form = testInstance.findByType(CreateEditCategoryForm);

        act(() => {
            form.props.setName(expectedName);
            form.props.setAmount(expectedAmount);
        });

        updateComponent();
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<EditVariableCategoryForm {...expectedProps} />);

        testInstance = testRenderer.root;
        setStateData();
    };

    beforeEach(() => {
        expectedProps = {
            variableCategory: createRandomVariableCategory()
        };
        updateVariableCategory = jest.fn();
        expectedName = chance.string();
        expectedAmount = chance.natural().toString();

        // @ts-ignore
        useMutation.mockReturnValue([updateVariableCategory]);

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call useMutation', () => {
        const updatedValues = {
            amount: Number(expectedAmount),
            name: expectedName
        };

        expect(useMutation).toHaveBeenCalledWith(updateVariableCategoryMutation, {
            optimisticResponse: {
                updateVariableCategory: {
                    __typename: 'VariableCategory',
                    ...expectedProps.variableCategory,
                    ...updatedValues
                }
            },
            variables: {
                variableCategory: {
                    userId: expectedProps.variableCategory.userId,
                    variableCategoryId: expectedProps.variableCategory.variableCategoryId,
                    ...updatedValues
                }
            }
        });
    });

    it('should render a CreateEditCategoryForm with the correct values', () => {
        const renderedCreateCategoryForm = testInstance.findByType(CreateEditCategoryForm);

        expect(renderedCreateCategoryForm.props.amount).toBe(expectedAmount);
        expect(renderedCreateCategoryForm.props.name).toBe(expectedName);

        act(() => {
            renderedCreateCategoryForm.props.onPress();
        });
        updateComponent();

        expect(updateVariableCategory).toHaveBeenCalledTimes(1);
    });
});
