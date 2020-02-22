import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import * as reactNavigation from '@react-navigation/native';

import {chance} from '../../chance';
import {createRandomFixedCategory} from '../../models';
import EditFixedCategoryForm from '../../../src/components/fixed-category/EditFixedCategoryForm';
import {updateFixedCategoryMutation} from '../../../src/graphql/mutations';
import CategoryForm from '../../../src/components/generic/CategoryForm';

jest.mock('@apollo/react-hooks');
jest.mock('@react-navigation/native');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/redux/hooks');

describe('EditFixedCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useNavigation} = reactNavigation as jest.Mocked<typeof reactNavigation>;

    let testRenderer,
        testInstance,
        expectedNavigation,
        expectedProps,
        expectedName,
        expectedAmount,
        expectedNote,
        updateFixedCategory;

    const updateComponent = (): void => {
        testRenderer.update(<EditFixedCategoryForm {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    const setStateData = (): void => {
        const form = testInstance.findByType(CategoryForm);

        act(() => {
            form.props.setName(expectedName);
            form.props.setAmount(expectedAmount);
            form.props.setNote(expectedNote);
        });

        updateComponent();
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<EditFixedCategoryForm {...expectedProps} />);

        testInstance = testRenderer.root;
        setStateData();
    };

    beforeEach(() => {
        expectedProps = {
            fixedCategory: createRandomFixedCategory()
        };
        updateFixedCategory = jest.fn();
        expectedName = chance.string();
        expectedAmount = chance.natural().toString();
        expectedNote = chance.string();
        expectedNavigation = {
            goBack: jest.fn()
        };

        // @ts-ignore
        useMutation.mockReturnValue([updateFixedCategory]);
        useNavigation.mockReturnValue(expectedNavigation);

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call useMutation', () => {
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

    it('should render a CategoryForm with the correct values', () => {
        const renderedCreateCategoryForm = testInstance.findByType(CategoryForm);

        expect(renderedCreateCategoryForm.props.amount).toBe(expectedAmount);
        expect(renderedCreateCategoryForm.props.name).toBe(expectedName);
        expect(renderedCreateCategoryForm.props.note).toBe(expectedNote);

        act(() => {
            renderedCreateCategoryForm.props.onPress();
        });
        updateComponent();

        expect(updateFixedCategory).toHaveBeenCalledTimes(1);
    });
});
