import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import * as reactRedux from 'react-redux';
import * as navigation from '@react-navigation/native';

import {chance} from '../../chance';
import {createRandomAppState} from '../../models';
import {createVariableCategoryMutation} from '../../../src/graphql/mutations';
import {getUserId} from '../../../src/services/auth-service';
import {createVariableCategoryUpdate} from '../../../src/utils/update-cache-utils';
import CreateCategoryForm from '../../../src/components/budget/CreateCategoryForm';
import NoActiveTimePeriod from '../../../src/components/budget/NoActiveTimePeriod';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('@react-navigation/native');
jest.mock('../../../src/services/auth-service');

describe('NoActiveTimePeriod', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useSelector} = reactRedux as jest.Mocked<typeof reactRedux>;
    const {useNavigation} = navigation as jest.Mocked<typeof navigation>;

    let testRenderer,
        testInstance,
        expectedNavigation,
        expectedLoading,
        expectedName,
        expectedAmount,
        expectedTimePeriodId,
        createTimePeriod;

    const updateComponent = (): void => {
        testRenderer.update(<NoActiveTimePeriod />);

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
        testRenderer = TestRenderer.create(<NoActiveTimePeriod />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        expectedTimePeriodId = chance.guid();
        createTimePeriod = jest.fn();
        expectedName = chance.string();
        expectedAmount = chance.natural().toString();
        expectedLoading = chance.bool();
        expectedNavigation = {
            navigate: jest.fn()
        };

        useSelector.mockReturnValue(expectedTimePeriodId);
        // @ts-ignore
        useMutation.mockReturnValue([createTimePeriod, {loading: expectedLoading}]);
        useNavigation.mockReturnValue(expectedNavigation);

        render();
    });

    it('should call useSelector', () => {
        const expectedState = createRandomAppState();

        const actualTimePeriodId = useSelector.mock.calls[0][0](expectedState);

        expect(actualTimePeriodId).toEqual(expectedState.timePeriodId);
    });

    it('should call useMutation', () => {
        const timePeriod = {
            beginDate: expect.any(String),
            endDate: expect.any(String),
            timePeriodId: expect.any(String),
            userId: getUserId()
        };

        expect(useMutation).toHaveBeenCalledWith(createVariableCategoryMutation, {
            optimisticResponse: {
                createVariableCategory: {
                    __typename: 'VariableCategory',
                    ...timePeriod
                }
            },
            update: createVariableCategoryUpdate,
            variables: {
                timePeriod
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

        expect(createTimePeriod).toHaveBeenCalledTimes(1);
        expect(renderedCreateCategoryForm.props.amount).toBe('');
        expect(renderedCreateCategoryForm.props.name).toBe('');
    });
});
