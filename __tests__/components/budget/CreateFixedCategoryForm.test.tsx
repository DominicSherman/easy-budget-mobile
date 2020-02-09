import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import * as reactRedux from 'react-redux';

import {chance} from '../../chance';
import {createRandomAppState} from '../../models';
import CreateFixedCategoryForm from '../../../src/components/budget/CreateFixedCategoryForm';
import {createFixedCategoryMutation} from '../../../src/graphql/mutations';
import {getUserId} from '../../../src/services/auth-service';
import {createFixedCategoryUpdate} from '../../../src/utils/update-cache-utils';
import CreateCategoryForm from '../../../src/components/budget/CreateCategoryForm';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../../src/services/auth-service');

describe('CreateFixedCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useSelector} = reactRedux as jest.Mocked<typeof reactRedux>;

    let testRenderer,
        testInstance,
        expectedName,
        expectedAmount,
        expectedTimePeriodId,
        createFixedCategory;

    const updateComponent = (): void => {
        testRenderer.update(<CreateFixedCategoryForm />);

        testInstance = testRenderer.root;
    };

    const setStateData = (): void => {
        const nameInput = testInstance.findByProps({title: 'Category Name *'});
        const amountInput = testInstance.findByProps({title: 'Category Amount *'});

        act(() => {
            nameInput.props.onChange(expectedName);
            amountInput.props.onChange(expectedAmount);
        });

        updateComponent();
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

        useSelector.mockReturnValue(expectedTimePeriodId);
        // @ts-ignore
        useMutation.mockReturnValue([createFixedCategory]);

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
        const fixedCategory = {
            amount: Number(expectedAmount),
            fixedCategoryId: expect.any(String),
            name: expectedName,
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

    it('should render a CreateCategoryForm with the correct values', () => {
        const renderedCreateCategoryForm = testInstance.findByType(CreateCategoryForm);

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

        expect(createFixedCategory).toHaveBeenCalledTimes(1);
        expect(renderedCreateCategoryForm.props.amount).toBe('');
        expect(renderedCreateCategoryForm.props.name).toBe('');
    });
});
