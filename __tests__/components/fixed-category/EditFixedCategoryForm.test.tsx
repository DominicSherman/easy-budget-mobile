import TestRenderer, {act} from 'react-test-renderer';
import {Alert} from 'react-native';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {MutationResult} from '@apollo/react-common';

import * as hooks from '../../../src/utils/hooks';
import {chance} from '../../chance';
import {createRandomFixedCategory} from '../../models';
import EditFixedCategoryForm from '../../../src/components/fixed-category/EditFixedCategoryForm';
import {updateFixedCategoryMutation} from '../../../src/graphql/mutations';
import Form from '../../../src/components/generic/Form';

jest.mock('@apollo/react-hooks');
jest.mock('@react-navigation/native');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/hooks');
jest.mock('../../../src/services/animation-service');

describe('EditFixedCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useBudgetNavigation} = hooks as jest.Mocked<typeof hooks>;

    let testRenderer,
        testInstance,
        expectedNavigation,
        expectedProps,
        expectedName,
        expectedAmount,
        expectedNote,
        updateFixedCategory,
        deleteFixedCategory;

    const setStateData = (): void => {
        const form = testInstance.findByType(Form);

        act(() => {
            form.props.setName(expectedName);
            form.props.setAmount(expectedAmount);
            form.props.setNote(expectedNote);
        });
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<EditFixedCategoryForm {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        expectedProps = {
            fixedCategory: createRandomFixedCategory(),
            onUpdate: jest.fn()
        };
        updateFixedCategory = jest.fn();
        deleteFixedCategory = jest.fn();
        expectedName = chance.string();
        expectedAmount = chance.natural().toString();
        expectedNote = chance.string();
        expectedNavigation = {
            goBack: jest.fn()
        };

        Alert.alert = jest.fn();
        useMutation
            .mockReturnValueOnce([updateFixedCategory, {} as MutationResult])
            .mockReturnValue([deleteFixedCategory, {} as MutationResult]);
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
            name: expectedName,
            note: expectedNote
        };

        expect(useMutation).toHaveBeenCalledWith(updateFixedCategoryMutation, {
            optimisticResponse: {
                updateFixedCategory: {
                    __typename: 'FixedCategory',
                    ...expectedProps.fixedCategory,
                    ...updatedValues
                }
            },
            variables: {
                fixedCategory: {
                    fixedCategoryId: expectedProps.fixedCategory.fixedCategoryId,
                    userId: expectedProps.fixedCategory.userId,
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
        expect(renderedCreateCategoryForm.props.note).toBe(expectedNote);
    });

    it('should pass an onPress', () => {
        const renderedCreateCategoryForm = testInstance.findByType(Form);

        act(() => {
            renderedCreateCategoryForm.props.onPress();
        });

        expect(updateFixedCategory).toHaveBeenCalledTimes(1);
        expect(expectedProps.onUpdate).toHaveBeenCalledTimes(1);
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
            `Delete ${expectedProps.fixedCategory.name}?`,
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

        expect(deleteFixedCategory).toHaveBeenCalledTimes(1);
    });
});
