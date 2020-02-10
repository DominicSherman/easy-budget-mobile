import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';

import {chance} from '../../chance';
import {createRandomFixedCategory} from '../../models';
import EditFixedCategoryForm from '../../../src/components/budget/EditFixedCategoryForm';
import {updateFixedCategoryMutation} from '../../../src/graphql/mutations';
import CreateEditCategoryForm from '../../../src/components/budget/CreateEditCategoryForm';

jest.mock('@apollo/react-hooks');
jest.mock('../../../src/services/auth-service');

describe('EditFixedCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;

    let testRenderer,
        testInstance,
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
        const form = testInstance.findByType(CreateEditCategoryForm);

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

        // @ts-ignore
        useMutation.mockReturnValue([updateFixedCategory]);

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

    it('should render a CreateEditCategoryForm with the correct values', () => {
        const renderedCreateCategoryForm = testInstance.findByType(CreateEditCategoryForm);

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
