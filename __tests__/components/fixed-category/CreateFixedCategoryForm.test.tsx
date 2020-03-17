import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import * as reactRedux from 'react-redux';

import {chance} from '../../chance';
import {createRandomAppState} from '../../models';
import CreateFixedCategoryForm from '../../../src/components/fixed-category/CreateFixedCategoryForm';
import {createFixedCategoryMutation} from '../../../src/graphql/mutations';
import {getUserId} from '../../../src/services/auth-service';
import {createFixedCategoryUpdate} from '../../../src/utils/update-cache-utils';
import Form from '../../../src/components/generic/Form';

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
        expectedNote,
        expectedTimePeriodId,
        createFixedCategory;

    const updateComponent = (): void => {
        testRenderer.update(<CreateFixedCategoryForm />);

        testInstance = testRenderer.root;
    };

    const setStateData = (): void => {
        const form = testInstance.findByType(Form);

        act(() => {
            form.props.setName(expectedName);
            form.props.setAmount(expectedAmount);
            form.props.setNote(expectedNote);
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
        expectedNote = chance.string();

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
            note: expectedNote,
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

    it('should render a Form with the correct values', () => {
        const renderedCreateCategoryForm = testInstance.findByType(Form);

        expect(renderedCreateCategoryForm.props.amount).toBe(expectedAmount);
        expect(renderedCreateCategoryForm.props.name).toBe(expectedName);
        expect(renderedCreateCategoryForm.props.note).toBe(expectedNote);

        act(() => {
            renderedCreateCategoryForm.props.onPress();
        });
        updateComponent();

        expect(createFixedCategory).toHaveBeenCalledTimes(1);
        expect(renderedCreateCategoryForm.props.amount).toBe('');
        expect(renderedCreateCategoryForm.props.name).toBe('');
        expect(renderedCreateCategoryForm.props.note).toBe('');
    });
});
