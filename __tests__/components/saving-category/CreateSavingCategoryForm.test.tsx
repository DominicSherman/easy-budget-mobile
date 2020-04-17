import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {MutationResult} from '@apollo/react-common';

import {chance} from '../../chance';
import CreateSavingCategoryForm from '../../../src/components/saving-category/CreateSavingCategoryForm';
import {createSavingCategoryMutation} from '../../../src/graphql/mutations';
import {getUserId} from '../../../src/services/auth-service';
import {createSavingCategoryUpdate} from '../../../src/utils/update-cache-utils';
import Form from '../../../src/components/generic/Form';
import * as hooks from '../../../src/utils/hooks';
import {Mode} from '../../../src/enums/Mode';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/hooks');

describe('CreateSavingCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useThemedSelectedColor, useMode} = hooks as jest.Mocked<typeof hooks>;

    let testRenderer,
        testInstance,
        expectedName,
        expectedThemedSelectedColor,
        createSavingCategory;

    const setStateData = (): void => {
        const form = testInstance.findByType(Form);

        act(() => {
            form.props.inputs[0].onChange(expectedName);
        });
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<CreateSavingCategoryForm />);

        testInstance = testRenderer.root;
        setStateData();
    };

    beforeEach(() => {
        createSavingCategory = jest.fn();
        expectedName = chance.string();
        expectedThemedSelectedColor = chance.string();

        useMutation.mockReturnValue([createSavingCategory, {} as MutationResult]);
        useThemedSelectedColor.mockReturnValue(expectedThemedSelectedColor);
        useMode.mockReturnValue(chance.pickone(Object.values(Mode)));

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call useMutation', () => {
        const savingCategory = {
            name: expectedName,
            savingCategoryId: expect.any(String),
            userId: getUserId()
        };

        expect(useMutation).toHaveBeenCalledWith(createSavingCategoryMutation, {
            optimisticResponse: {
                createSavingCategory: {
                    __typename: 'SavingCategory',
                    ...savingCategory
                }
            },
            update: createSavingCategoryUpdate,
            variables: {
                savingCategory
            }
        });
    });

    describe('Form', () => {
        let renderedForm,
            createButton;

        beforeEach(() => {
            setStateData();

            renderedForm = testInstance.findByType(Form);

            createButton = renderedForm.props.buttons[0];
        });

        it('should render a Form with the correct inputs', () => {
            const nameInput = renderedForm.props.inputs[0];

            expect(nameInput).toEqual({
                onChange: expect.any(Function),
                title: 'Category Name *',
                value: expectedName
            });
        });

        it('should pass the create button', () => {
            expect(createButton).toEqual({
                disabled: expect.any(Boolean),
                onPress: expect.any(Function),
                text: 'Create',
                wrapperStyle: {
                    backgroundColor: expectedThemedSelectedColor
                }
            });

            act(() => {
                createButton.onPress();
            });

            expect(createSavingCategory).toHaveBeenCalledTimes(1);
        });
    });
});
