import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as apolloReactHooks from '@apollo/react-hooks';
import {MutationResult} from '@apollo/react-common';

import VariableCategory from '../../src/screens/VariableCategory';
import {
    createRandomExpenses,
    createRandomQueryResult,
    createRandomVariableCategories,
    createRandomVariableCategory,
    createRouteProps
} from '../models';
import {chance} from '../chance';
import {getVariableCategoryQuery} from '../../src/graphql/queries';
import {getUserId} from '../../src/services/auth-service';
import {getEarlyReturn} from '../../src/services/error-and-loading-service';
import * as hooks from '../../src/utils/hooks';
import {Color} from '../../src/constants/color';

jest.mock('@apollo/react-hooks');
jest.mock('../../src/services/auth-service');
jest.mock('../../src/utils/hooks');

describe('VariableCategory', () => {
    const {useQuery, useMutation} = apolloReactHooks as jest.Mocked<typeof apolloReactHooks>;
    const {useTheme} = hooks as jest.Mocked<typeof hooks>;

    let root,
        expectedProps,
        expectedQueryResult;

    const render = (): void => {
        root = TestRenderer.create(
            <VariableCategory {...createRouteProps(expectedProps)} />
        ).root;
    };

    beforeEach(() => {
        expectedProps = {
            variableCategoryId: chance.guid()
        };
        expectedQueryResult = createRandomQueryResult({
            variableCategory: createRandomVariableCategory()
        });

        useQuery.mockImplementation((query) => {
            if (query === getVariableCategoryQuery) {
                return expectedQueryResult;
            }

            return createRandomQueryResult({
                expenses: createRandomExpenses(),
                variableCategories: createRandomVariableCategories()
            });
        });
        useMutation.mockReturnValue([jest.fn(), {} as MutationResult]);
        useTheme.mockReturnValue({
            backgroundColor: chance.pickone(Object.values(Color)),
            textColor: chance.pickone(Object.values(Color))
        });

        render();
    });

    it('should call useQuery', () => {
        expect(useQuery).toHaveBeenCalledWith(getVariableCategoryQuery, {
            notifyOnNetworkStatusChange: true,
            variables: {
                userId: getUserId(),
                variableCategoryId: expectedProps.variableCategoryId
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
});
