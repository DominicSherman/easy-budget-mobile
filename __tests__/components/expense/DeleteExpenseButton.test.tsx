import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {MutationResult} from '@apollo/react-common';

import {chance} from '../../chance';
import {deleteExpenseMutation} from '../../../src/graphql/mutations';
import {getUserId} from '../../../src/services/auth-service';
import DeleteExpenseButton from '../../../src/components/expense/DeleteExpenseButton';
import * as hooks from '../../../src/utils/hooks';

jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/update-cache-utils');
jest.mock('../../../src/utils/hooks');

describe('DeleteExpenseButton', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useBudgetNavigation} = hooks as jest.Mocked<typeof hooks>;

    let testRenderer,
        testInstance,
        expectedNavigation,
        expectedProps,
        deleteExpense;

    const render = (): void => {
        testRenderer = TestRenderer.create(<DeleteExpenseButton {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        expectedProps = {
            expenseId: chance.guid()
        };
        deleteExpense = jest.fn();
        expectedNavigation = {
            goBack: jest.fn()
        };

        useMutation.mockReturnValue([deleteExpense, {} as MutationResult]);
        useBudgetNavigation.mockReturnValue(expectedNavigation);

        render();
    });

    it('should call useMutation for delete', () => {
        expect(useMutation).toHaveBeenCalledWith(deleteExpenseMutation, {
            optimisticResponse: {
                deleteExpense: expectedProps.expenseId
            },
            update: expect.any(Function),
            variables: {
                expenseId: expectedProps.expenseId,
                userId: getUserId()
            }
        });
    });

    it('should render a Button', () => {
        const renderedButton = testInstance.findByProps({text: 'Delete'});

        act(() => {
            renderedButton.props.onPress();
        });

        expect(deleteExpense).toHaveBeenCalledTimes(1);
    });
});
