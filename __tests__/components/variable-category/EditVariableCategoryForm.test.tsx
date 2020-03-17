import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {Alert} from 'react-native';
import {MutationResult} from '@apollo/react-common';

import {chance} from '../../chance';
import {createRandomVariableCategory} from '../../models';
import EditVariableCategoryForm from '../../../src/components/variable-category/EditVariableCategoryForm';
import {updateVariableCategoryMutation} from '../../../src/graphql/mutations';
import Form from '../../../src/components/generic/Form';
import * as hooks from '../../../src/utils/hooks';

jest.mock('@apollo/react-hooks');
jest.mock('@react-navigation/native');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/hooks');
jest.mock('../../../src/services/animation-service');

describe('EditVariableCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useBudgetNavigation} = hooks as jest.Mocked<typeof hooks>;

    let testRenderer,
        testInstance,
        expectedNavigation,
        expectedProps,
        expectedName,
        expectedAmount,
        updateVariableCategory,
        deleteVariableCategory;

    const setStateData = (): void => {
        const form = testInstance.findByType(Form);

        act(() => {
            form.props.setName(expectedName);
            form.props.setAmount(expectedAmount);
        });
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<EditVariableCategoryForm {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        expectedProps = {
            onUpdate: jest.fn(),
            variableCategory: createRandomVariableCategory()
        };
        expectedNavigation = {goBack: jest.fn()};
        updateVariableCategory = jest.fn();
        expectedName = chance.string();
        expectedAmount = chance.natural().toString();
        deleteVariableCategory = jest.fn();

        Alert.alert = jest.fn();

        useMutation
            .mockReturnValueOnce([updateVariableCategory, {} as MutationResult])
            .mockReturnValue([deleteVariableCategory, {} as MutationResult]);
        useBudgetNavigation.mockReturnValue(expectedNavigation);

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call useMutation', () => {
        setStateData();

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

    it('should render a Form with the correct values', () => {
        setStateData();

        const renderedCreateCategoryForm = testInstance.findByType(Form);

        expect(renderedCreateCategoryForm.props.amount).toBe(expectedAmount);
        expect(renderedCreateCategoryForm.props.name).toBe(expectedName);
    });

    it('should pass an onPress', () => {
        const renderedCreateCategoryForm = testInstance.findByType(Form);

        act(() => {
            renderedCreateCategoryForm.props.onPress();
        });

        expect(updateVariableCategory).toHaveBeenCalledTimes(1);
    });

    it('should **not** blow up if onUpdate is not passed', () => {
        expectedProps.onUpdate = null;
        render();

        const renderedCreateCategoryForm = testInstance.findByType(Form);

        act(() => {
            renderedCreateCategoryForm.props.onPress();
        });
    });

    it('should pass a secondOnPress function', () => {
        const renderedCreateCategoryForm = testInstance.findByType(Form);

        act(() => {
            renderedCreateCategoryForm.props.secondOnPress();
        });

        expect(Alert.alert).toHaveBeenCalledTimes(1);
        expect(Alert.alert).toHaveBeenCalledWith(
            `Delete ${expectedProps.variableCategory.name}?`,
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

        expect(deleteVariableCategory).toHaveBeenCalledTimes(1);
    });
});
