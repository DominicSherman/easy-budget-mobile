import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as apolloReactHooks from '@apollo/react-hooks';

import Expense from '../../src/screens/Expense';
import {
    createRandomExpense,
    createRandomQueryResult,
    createRandomVariableCategories,
    createRouteProps
} from '../models';
import {chance} from '../chance';
import {getExpenseQuery} from '../../src/graphql/queries';
import {getUserId} from '../../src/services/auth-service';
import {getEarlyReturn} from '../../src/services/error-and-loading-service';
import EditExpenseForm from '../../src/components/expense/EditExpenseForm';

jest.mock('@apollo/react-hooks');
jest.mock('../../src/services/auth-service');
jest.mock('../../src/redux/hooks');

describe('Expense', () => {
    const {useQuery} = apolloReactHooks as jest.Mocked<typeof apolloReactHooks>;

    let root,
        expectedProps,
        expectedQueryResult,
        expectedSecondQueryResult;

    const render = (): void => {
        root = TestRenderer.create(
            <Expense {...createRouteProps(expectedProps)} />
        ).root;
    };

    beforeEach(() => {
        expectedProps = {
            expenseId: chance.guid()
        };
        expectedQueryResult = createRandomQueryResult({
            expense: createRandomExpense()
        });
        expectedSecondQueryResult = createRandomQueryResult({
            variableCategories: createRandomVariableCategories()
        });

        useQuery
            .mockReturnValueOnce(expectedQueryResult)
            .mockReturnValueOnce(expectedSecondQueryResult);

        render();
    });

    it('should call useQuery', () => {
        expect(useQuery).toHaveBeenCalledWith(getExpenseQuery, {
            variables: {
                expenseId: expectedProps.expenseId,
                userId: getUserId()
            }
        });
    });

    it('should return early if there is no data', () => {
        expectedQueryResult.data = undefined;
        useQuery.mockReturnValue(expectedQueryResult);
        render();

        const earlyReturn = getEarlyReturn(expectedQueryResult);

        root.findByType(earlyReturn.type);
    });

    it('should render an EditExpenseForm', () => {
        root.findByType(EditExpenseForm);
    });
});
