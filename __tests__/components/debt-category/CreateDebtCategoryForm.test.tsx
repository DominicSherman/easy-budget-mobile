import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {MutationResult} from '@apollo/react-common';

import {chance} from '../../chance';
import CreateDebtCategoryForm from '../../../src/components/debt-category/CreateDebtCategoryForm';
import {createDebtCategoryMutation} from '../../../src/graphql/mutations';
import {getUserId} from '../../../src/services/auth-service';
import {createDebtCategoryUpdate} from '../../../src/utils/update-cache-utils';
import Form from '../../../src/components/generic/Form';
import * as hooks from '../../../src/utils/hooks';
import {Mode} from '../../../src/enums/Mode';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/hooks');

describe('CreateDebtCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useThemedSelectedColor, useMode} = hooks as jest.Mocked<typeof hooks>;

    let testRenderer,
        testInstance,
        expectedName,
        expectedThemeSelectedColor,
        createDebtCategory;

    const setStateData = (): void => {
        const form = testInstance.findByType(Form);

        act(() => {
            form.props.inputs[0].onChange(expectedName);
        });
    };

    const render = (): void => {
        testRenderer = TestRenderer.create(<CreateDebtCategoryForm />);

        testInstance = testRenderer.root;
        setStateData();
    };

    beforeEach(() => {
        createDebtCategory = jest.fn();
        expectedName = chance.string();
        expectedThemeSelectedColor = chance.string();

        useMutation.mockReturnValue([createDebtCategory, {} as MutationResult]);
        useThemedSelectedColor.mockReturnValue(expectedThemeSelectedColor);
        useMode.mockReturnValue(chance.pickone(Object.values(Mode)));

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call useMutation', () => {
        const debtCategory = {
            debtCategoryId: expect.any(String),
            name: expectedName,
            userId: getUserId()
        };

        expect(useMutation).toHaveBeenCalledWith(createDebtCategoryMutation, {
            optimisticResponse: {
                createDebtCategory: {
                    __typename: 'DebtCategory',
                    ...debtCategory
                }
            },
            update: createDebtCategoryUpdate,
            variables: {
                debtCategory
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
                    backgroundColor: expectedThemeSelectedColor
                }
            });

            act(() => {
                createButton.onPress();
            });

            expect(createDebtCategory).toHaveBeenCalledTimes(1);
        });
    });
});
