import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import * as reactRedux from 'react-redux';

import {chance} from '../chance';
import {createRandomAppState} from '../models';
import CreateEditCategoryForm from '../../src/components/CreateEditCategoryForm';
import {createVariableCategoryMutation} from '../../src/graphql/mutations';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../src/services/auth-service');

describe('CreateEditCategoryForm', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useSelector} = reactRedux as jest.Mocked<typeof reactRedux>;

    let root,
        setName,
        setAmount,
        expectedName,
        expectedAmount,
        expectedTimePeriodId,
        createVariableCategory;

    const render = (): void => {
        root = TestRenderer.create(
            <CreateEditCategoryForm />
        ).root;
    };

    beforeEach(() => {
        expectedTimePeriodId = chance.guid();
        createVariableCategory = jest.fn();
        expectedName = chance.string();
        expectedAmount = chance.natural().toString();
        setName = jest.fn();
        setAmount = jest.fn();

        useSelector.mockReturnValue(expectedTimePeriodId);
        // @ts-ignore
        useMutation.mockReturnValue([createVariableCategory]);

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
});
